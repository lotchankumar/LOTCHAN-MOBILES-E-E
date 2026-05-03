import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/auth_provider.dart';
import 'manager/manager_dashboard.dart';
import 'staff/staff_dashboard.dart';
import 'technician/technician_dashboard.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;
  bool _obscurePassword = true;
  String _selectedRole = 'technician';

  Future<void> _handleLogin() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    final auth = Provider.of<AuthProvider>(context, listen: false);
    final success = await auth.login(
      _emailController.text.trim(),
      _passwordController.text,
    );

    if (success) {
      final role = auth.user?.role;
      Widget nextScreen;

      switch (role) {
        case 'MANAGER':
          nextScreen = const ManagerDashboard();
          break;
        case 'STAFF':
          nextScreen = const StaffDashboard();
          break;
        case 'TECHNICIAN':
          nextScreen = const TechnicianDashboard();
          break;
        default:
          nextScreen = const LoginScreen();
          await auth.logout();
      }

      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => nextScreen),
        );
      }
    } else {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _errorMessage = 'Invalid credentials or access denied.';
        });
      }
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Widget _buildTextField({
    required String label,
    required IconData icon,
    required String hintText,
    bool isPassword = false,
    TextEditingController? controller,
    Widget? trailing,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4.0, bottom: 4.0),
          child: Text(
            label,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: Color(0xFFC4C6CF),
              letterSpacing: 0.5,
              fontFamily: 'Inter',
            ),
          ),
        ),
        Container(
          height: 52,
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.4),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.white.withOpacity(0.1)),
          ),
          child: Row(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Icon(icon, color: const Color(0xFFC4C6CF)),
              ),
              Expanded(
                child: TextField(
                  controller: controller,
                  obscureText: isPassword && _obscurePassword,
                  style: const TextStyle(color: Color(0xFFD2E4FF), fontSize: 16, fontFamily: 'Inter'),
                  decoration: InputDecoration(
                    hintText: hintText,
                    hintStyle: TextStyle(color: const Color(0xFFC4C6CF).withOpacity(0.4), fontFamily: 'Inter'),
                    border: InputBorder.none,
                  ),
                ),
              ),
              if (trailing != null) trailing,
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildRoleDropdown() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 4.0, bottom: 4.0),
          child: Text(
            'ACCESS PROTOCOL / ROLE',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: Color(0xFFC4C6CF),
              letterSpacing: 0.5,
              fontFamily: 'Inter',
            ),
          ),
        ),
        Container(
          height: 52,
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.4),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.white.withOpacity(0.1)),
          ),
          child: Row(
            children: [
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0),
                child: Icon(Icons.engineering_outlined, color: Color(0xFFC4C6CF)),
              ),
              Expanded(
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedRole,
                    icon: const Padding(
                      padding: EdgeInsets.only(right: 16.0),
                      child: Icon(Icons.expand_more, color: Color(0xFFC4C6CF)),
                    ),
                    dropdownColor: const Color(0xFF001429),
                    style: const TextStyle(color: Color(0xFFD2E4FF), fontSize: 16, fontFamily: 'Inter'),
                    onChanged: (String? newValue) {
                      setState(() {
                        if (newValue != null) _selectedRole = newValue;
                      });
                    },
                    items: const [
                      DropdownMenuItem(value: 'technician', child: Text('Master Technician')),
                      DropdownMenuItem(value: 'manager', child: Text('Shop Manager')),
                      DropdownMenuItem(value: 'staff', child: Text('Staff Member')),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPerformanceMetrics() {
    return Row(
      children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF001429).withOpacity(0.7),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.white.withOpacity(0.1)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'SYSTEM HEALTH',
                  style: TextStyle(
                    fontSize: 10,
                    color: Color(0xFFC4C6CF),
                    fontWeight: FontWeight.w500,
                    letterSpacing: 1.0,
                    fontFamily: 'Inter',
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(
                        color: Colors.green,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Text('Optimal', style: TextStyle(fontSize: 14, color: Color(0xFFD2E4FF), fontFamily: 'Inter')),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF001429).withOpacity(0.7),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.white.withOpacity(0.1)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'UPTIME',
                  style: TextStyle(
                    fontSize: 10,
                    color: Color(0xFFC4C6CF),
                    fontWeight: FontWeight.w500,
                    letterSpacing: 1.0,
                    fontFamily: 'Inter',
                  ),
                ),
                SizedBox(height: 4),
                Text('99.98%', style: TextStyle(fontSize: 14, color: Color(0xFFD2E4FF), fontFamily: 'Inter')),
              ],
            ),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF001429),
      body: Stack(
        children: [
          // Background Carousel
          const _CarouselBackground(),
          
          // Content
          SafeArea(
            child: Column(
              children: [
                // Header
                Container(
                  height: 80,
                  alignment: Alignment.center,
                  child: const Text(
                    'LOTCHAN MOBILES',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      fontStyle: FontStyle.italic,
                      letterSpacing: -0.5,
                      color: Color(0xFFA1C9FF),
                      fontFamily: 'Inter',
                    ),
                  ),
                ),
                
                // Scrollable Form Area
                Expanded(
                  child: Center(
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 24.0),
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 448), // max-w-md
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text(
                              'System Access',
                              style: TextStyle(
                                fontSize: 32,
                                fontWeight: FontWeight.w700,
                                color: Color(0xFFD2E4FF),
                                fontFamily: 'Inter',
                              ),
                            ),
                            const SizedBox(height: 8),
                            const Text(
                              'Performance Tuned Interface',
                              style: TextStyle(
                                fontSize: 16,
                                color: Color(0xFFC4C6CF),
                                fontFamily: 'Inter',
                              ),
                            ),
                            const SizedBox(height: 32),
                            
                            // Glass Panel Form
                            ClipRRect(
                              borderRadius: BorderRadius.circular(12),
                              child: BackdropFilter(
                                filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                                child: Container(
                                  padding: const EdgeInsets.all(24),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF001429).withOpacity(0.7),
                                    border: Border.all(color: Colors.white.withOpacity(0.1)),
                                    borderRadius: BorderRadius.circular(12),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withOpacity(0.2),
                                        blurRadius: 20,
                                        spreadRadius: 5,
                                      ),
                                    ],
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.stretch,
                                    children: [
                                      if (_errorMessage != null) ...[
                                        Container(
                                          padding: const EdgeInsets.all(12),
                                          decoration: BoxDecoration(
                                            color: Colors.red.withOpacity(0.1),
                                            borderRadius: BorderRadius.circular(8),
                                            border: Border.all(color: Colors.red.withOpacity(0.3)),
                                          ),
                                          child: Row(
                                            children: [
                                              const Icon(Icons.error_outline, color: Colors.red, size: 20),
                                              const SizedBox(width: 8),
                                              Expanded(
                                                child: Text(
                                                  _errorMessage!,
                                                  style: const TextStyle(color: Colors.red, fontSize: 14),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        const SizedBox(height: 16),
                                      ],
                                      
                                      _buildTextField(
                                        label: 'IDENTIFICATION / EMAIL',
                                        icon: Icons.mail_outline,
                                        hintText: 'Enter your credentials',
                                        controller: _emailController,
                                      ),
                                      const SizedBox(height: 16),
                                      
                                      _buildTextField(
                                        label: 'SECURE KEY / PASSWORD',
                                        icon: Icons.lock_outline,
                                        hintText: '••••••••',
                                        isPassword: true,
                                        controller: _passwordController,
                                        trailing: IconButton(
                                          icon: Icon(
                                            _obscurePassword ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                                            color: const Color(0xFFC4C6CF),
                                          ),
                                          onPressed: () {
                                            setState(() {
                                              _obscurePassword = !_obscurePassword;
                                            });
                                          },
                                        ),
                                      ),
                                      const SizedBox(height: 16),
                                      
                                      _buildRoleDropdown(),
                                      const SizedBox(height: 24),
                                      
                                      // Login Button
                                      Container(
                                        height: 52,
                                        decoration: BoxDecoration(
                                          borderRadius: BorderRadius.circular(8),
                                          gradient: const LinearGradient(
                                            colors: [Color(0xFFAEC8F0), Color(0xFF11487A)],
                                            begin: Alignment.topLeft,
                                            end: Alignment.bottomRight,
                                          ),
                                          boxShadow: [
                                            BoxShadow(
                                              color: const Color(0xFFAEC8F0).withOpacity(0.2),
                                              blurRadius: 15,
                                              offset: const Offset(0, 4),
                                            ),
                                          ],
                                        ),
                                        child: Material(
                                          color: Colors.transparent,
                                          child: InkWell(
                                            borderRadius: BorderRadius.circular(8),
                                            onTap: _isLoading ? null : _handleLogin,
                                            child: Center(
                                              child: _isLoading
                                                  ? const SizedBox(
                                                      height: 20,
                                                      width: 20,
                                                      child: CircularProgressIndicator(
                                                        strokeWidth: 2,
                                                        valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF153152)),
                                                      ),
                                                    )
                                                  : const Text(
                                                      'INITIALIZE ENGINE',
                                                      style: TextStyle(
                                                        color: Color(0xFF153152),
                                                        fontSize: 15,
                                                        fontWeight: FontWeight.w600,
                                                        letterSpacing: 0.5,
                                                        fontFamily: 'Inter',
                                                      ),
                                                    ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      const SizedBox(height: 16),
                                      
                                      // Links
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          TextButton(
                                            onPressed: () {},
                                            style: TextButton.styleFrom(
                                              padding: EdgeInsets.zero,
                                              minimumSize: Size.zero,
                                              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                            ),
                                            child: const Text(
                                              'FORGOT KEY?',
                                              style: TextStyle(
                                                color: Color(0xFFA1C9FF),
                                                fontSize: 12,
                                                fontWeight: FontWeight.w500,
                                                fontFamily: 'Inter',
                                              ),
                                            ),
                                          ),
                                          TextButton(
                                            onPressed: () {},
                                            style: TextButton.styleFrom(
                                              padding: EdgeInsets.zero,
                                              minimumSize: Size.zero,
                                              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                            ),
                                            child: Row(
                                              children: const [
                                                Text(
                                                  'OFFLINE MODE ',
                                                  style: TextStyle(
                                                    color: Color(0xFFC4C6CF),
                                                    fontSize: 12,
                                                    fontWeight: FontWeight.w500,
                                                    fontFamily: 'Inter',
                                                  ),
                                                ),
                                                Icon(Icons.offline_bolt_outlined, color: Color(0xFFC4C6CF), size: 14),
                                              ],
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            
                            const SizedBox(height: 24),
                            _buildPerformanceMetrics(),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                
                // Footer
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 32),
                  decoration: BoxDecoration(
                    color: const Color(0xFF071A2F),
                    border: Border(top: BorderSide(color: Colors.white.withOpacity(0.05))),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        '© 2024 LOTCHAN MOBILES. PERFORMANCE TUNED.',
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey,
                          fontWeight: FontWeight.w500,
                          letterSpacing: 1.5,
                          fontFamily: 'Inter',
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),
                      Wrap(
                        alignment: WrapAlignment.center,
                        spacing: 16,
                        runSpacing: 8,
                        children: [
                          _buildFooterLink('Privacy Policy'),
                          _buildFooterLink('Terms of Service'),
                          _buildFooterLink('System Status'),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFooterLink(String text) {
    return InkWell(
      onTap: () {},
      child: Text(
        text.toUpperCase(),
        style: const TextStyle(
          fontSize: 12,
          color: Colors.grey,
          fontWeight: FontWeight.w500,
          letterSpacing: 1.5,
          fontFamily: 'Inter',
        ),
      ),
    );
  }
}

class _CarouselBackground extends StatefulWidget {
  const _CarouselBackground({Key? key}) : super(key: key);

  @override
  __CarouselBackgroundState createState() => __CarouselBackgroundState();
}

class __CarouselBackgroundState extends State<_CarouselBackground> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final List<String> images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCKZERQK2BouA0ViMw9B_meat3W2j4tw3jcpdlO8lJvreuYC8bGHgH48C-FojXKQzIuByif6KjgvPVbNBlvZIR9Jd7ZgNn-F2JA36QSablC8-E_MgBYpKmTQxjGYB8zoknhd1a9tjnaJ4Wow4KZE9bEUPH3bVwL1sqj1IokdeMEFuHaURQnjuSX4vH_6Xq9PiVNxob9iG8q3GVwTge9p798-L7CNlkIlkVt-_PjvKWogKEJyHa548gvjuV87fCiq5lTh2KPPqJEtEI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCKZERQK2BouA0ViMw9B_meat3W2j4tw3jcpdlO8lJvreuYC8bGHgH48C-FojXKQzIuByif6KjgvPVbNBlvZIR9Jd7ZgNn-F2JA36QSablC8-E_MgBYpKmTQxjGYB8zoknhd1a9tjnaJ4Wow4KZE9bEUPH3bVwL1sqj1IokdeMEFuHaURQnjuSX4vH_6Xq9PiVNxob9iG8q3GVwTge9p798-L7CNlkIlkVt-_PjvKWogKEJyHa548gvjuV87fCiq5lTh2KPPqJEtEI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCKZERQK2BouA0ViMw9B_meat3W2j4tw3jcpdlO8lJvreuYC8bGHgH48C-FojXKQzIuByif6KjgvPVbNBlvZIR9Jd7ZgNn-F2JA36QSablC8-E_MgBYpKmTQxjGYB8zoknhd1a9tjnaJ4Wow4KZE9bEUPH3bVwL1sqj1IokdeMEFuHaURQnjuSX4vH_6Xq9PiVNxob9iG8q3GVwTge9p798-L7CNlkIlkVt-_PjvKWogKEJyHa548gvjuV87fCiq5lTh2KPPqJEtEI',
  ];
  int currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 8));
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        setState(() {
          currentIndex = (currentIndex + 1) % images.length;
        });
        _controller.forward(from: 0.0);
      }
    });
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        for (int i = 0; i < images.length; i++)
          AnimatedOpacity(
            opacity: i == currentIndex ? 1.0 : 0.0,
            duration: const Duration(seconds: 2),
            child: Image.network(
              images[i],
              fit: BoxFit.cover,
            ),
          ),
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                const Color(0xFF001429).withOpacity(0.8),
                const Color(0xFF001429).withOpacity(0.4),
                const Color(0xFF001429).withOpacity(0.9),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
        ),
      ],
    );
  }
}

