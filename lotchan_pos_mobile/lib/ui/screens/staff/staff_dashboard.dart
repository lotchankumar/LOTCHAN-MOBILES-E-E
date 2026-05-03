import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/auth_provider.dart';

class StaffDashboard extends StatefulWidget {
  const StaffDashboard({super.key});

  @override
  State<StaffDashboard> createState() => _StaffDashboardState();
}

class _StaffDashboardState extends State<StaffDashboard> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const _SalesScreen(),
    const Center(child: Text('Shift Management (WIP)')),
    const Center(child: Text('Repairs (WIP)')),
  ];

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Sales Staff'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => auth.logout(),
            tooltip: 'Logout',
          ),
        ],
      ),
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        selectedItemColor: Theme.of(context).primaryColor,
        unselectedItemColor: Colors.white54,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.point_of_sale),
            label: 'Sales',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.schedule),
            label: 'Shift',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.build),
            label: 'Repairs',
          ),
        ],
      ),
    );
  }
}

class _SalesScreen extends StatelessWidget {
  const _SalesScreen();

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'Welcome, ${auth.user?.email ?? "Staff Member"}',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Theme.of(context).primaryColor.withOpacity(0.3)),
          ),
          child: Column(
            children: [
              const Icon(Icons.point_of_sale, size: 64, color: Colors.white),
              const SizedBox(height: 16),
              Text(
                'New Sale',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(color: Colors.white),
              ),
              const SizedBox(height: 8),
              const Text(
                'Start a new transaction',
                style: TextStyle(color: Colors.white70),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    // Navigate to sale process
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Sale process coming soon')),
                    );
                  },
                  child: const Text('Start Checkout'),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
