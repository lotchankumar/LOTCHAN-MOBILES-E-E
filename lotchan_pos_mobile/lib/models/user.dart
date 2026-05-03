class User {
  final String id;
  final String email;
  final String role;
  final String? branchId;

  User({
    required this.id,
    required this.email,
    required this.role,
    this.branchId,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      role: json['role'],
      branchId: json['branchId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'role': role,
      'branchId': branchId,
    };
  }
}
