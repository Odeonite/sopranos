import 'package:crud/app/modules/MtaaniKonnect.dart';
import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';

import 'app/app_module.dart';
import 'app/app_widget.dart';

void main() {
  runApp(MtaaniKonnect());
}

class MtaaniKonnect extends StatelessWidget {
  const MtaaniKonnect({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Service Provider App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MtaaniConnect(),
    );
  }
}
