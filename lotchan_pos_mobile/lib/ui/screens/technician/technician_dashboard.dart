import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/api_service.dart';
import '../../../core/auth_provider.dart';

class TechnicianDashboard extends StatefulWidget {
  const TechnicianDashboard({super.key});

  @override
  State<TechnicianDashboard> createState() => _TechnicianDashboardState();
}

class _TechnicianDashboardState extends State<TechnicianDashboard> {
  final ApiService _apiService = ApiService();
  bool _isLoading = true;
  List<dynamic> _repairs = [];
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchRepairs();
  }

  Future<void> _fetchRepairs() async {
    // Note: Mocking endpoint for demonstration, typically '/technician/repairs' or similar
    setState(() {
      _isLoading = false;
      // Provide dummy data for UI display since we might not have a specific tech endpoint 
      // seeded or known precisely. In a real app this would be:
      // final response = await _apiService.get('/repairs');
      // etc.
      _repairs = [
        {
          'id': 'REP-1001',
          'customerName': 'John Doe',
          'device': 'iPhone 13 Pro',
          'issue': 'Screen Replacement',
          'status': 'PENDING',
        },
        {
          'id': 'REP-1002',
          'customerName': 'Jane Smith',
          'device': 'Samsung S22',
          'issue': 'Battery Issue',
          'status': 'IN_PROGRESS',
        }
      ];
    });
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'PENDING':
        return Colors.orange;
      case 'IN_PROGRESS':
        return Colors.blue;
      case 'COMPLETED':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Repairs Queue'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              setState(() => _isLoading = true);
              _fetchRepairs();
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => auth.logout(),
            tooltip: 'Logout',
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!, style: const TextStyle(color: Colors.red)))
              : _repairs.isEmpty
                  ? const Center(child: Text('No active repairs.'))
                  : ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: _repairs.length,
                      itemBuilder: (context, index) {
                        final repair = _repairs[index];
                        final statusColor = _getStatusColor(repair['status']);
                        
                        return Card(
                          color: Colors.white.withOpacity(0.05),
                          margin: const EdgeInsets.only(bottom: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                            side: BorderSide(color: Colors.white.withOpacity(0.1)),
                          ),
                          child: ExpansionTile(
                            leading: CircleAvatar(
                              backgroundColor: statusColor.withOpacity(0.2),
                              child: Icon(Icons.build_circle, color: statusColor),
                            ),
                            title: Text('${repair['device']} - ${repair['id']}'),
                            subtitle: Text('Customer: ${repair['customerName']}'),
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(16.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('Issue: ${repair['issue']}', style: const TextStyle(fontSize: 16)),
                                    const SizedBox(height: 16),
                                    Row(
                                      children: [
                                        Text(
                                          'Status: ${repair['status']}',
                                          style: TextStyle(color: statusColor, fontWeight: FontWeight.bold),
                                        ),
                                        const Spacer(),
                                        ElevatedButton(
                                          onPressed: () {
                                            ScaffoldMessenger.of(context).showSnackBar(
                                              const SnackBar(content: Text('Status update coming soon')),
                                            );
                                          },
                                          style: ElevatedButton.styleFrom(
                                            backgroundColor: statusColor,
                                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                          ),
                                          child: const Text('Update Status'),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
    );
  }
}
