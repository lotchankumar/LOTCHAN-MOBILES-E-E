import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/auth_provider.dart';
import 'ui/theme.dart';
import 'ui/screens/login_screen.dart';
import 'ui/screens/manager/manager_dashboard.dart';
import 'ui/screens/staff/staff_dashboard.dart';
import 'ui/screens/technician/technician_dashboard.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: const LotchanPOSApp(),
    ),
  );
}

class LotchanPOSApp extends StatelessWidget {
  const LotchanPOSApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lotchan POS',
      theme: AppTheme.darkTheme,
      home: const AuthWrapper(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, auth, _) {
        if (auth.isLoading) {
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        }

        if (!auth.isAuthenticated) {
          return const LoginScreen();
        }

        switch (auth.user?.role) {
          case 'MANAGER':
            return const ManagerDashboard();
          case 'STAFF':
            return const StaffDashboard();
          case 'TECHNICIAN':
            return const TechnicianDashboard();
          default:
            return const LoginScreen();
        }
      },
    );
  }
}
