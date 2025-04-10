import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: FirebaseOptions(
            apiKey: "AIzaSyDOVi415w5VeXS8gQK8I8HgqVl6NESo-Cc",
            authDomain: "backup13thfeb-a0ssgv.firebaseapp.com",
            projectId: "backup13thfeb-a0ssgv",
            storageBucket: "backup13thfeb-a0ssgv.firebasestorage.app",
            messagingSenderId: "6509355321",
            appId: "1:6509355321:web:c5759454abbbe8fb3748e8"));
  } else {
    await Firebase.initializeApp();
  }
}
