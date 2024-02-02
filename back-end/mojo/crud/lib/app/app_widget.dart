import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';

class AppWidget extends StatelessWidget {
  const AppWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: Modular.routerConfig,
    );
  }
}

class MtaaniKonnect extends StatelessWidget {
  List<String> recentProviders() {
    return ['Provider1', 'Provider2', 'Provider3'];
  }

  List<String> categoriesList() {
    return ['Category1', 'Category2', 'Category3'];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Service Providers'),
      ),
      body: Container(
        child: Column(
          children: [
            SearchBar(),
            CategoriesList(categoriesList()),
            RecentProviders(recentProviders())
          ],
        ),
      ),
    );
  }

  CategoriesList(List<String> categoriesList) {}

  RecentProviders(List<String> recentProviders) {}
}

class SearchBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: TextField(
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          prefixIcon: Icon(Icons.search),
          hintText: 'Search',
        ),
      ),
    );
  }
}

class CategoriesList extends StatelessWidget {
  final categories = ['Laundry', 'Groceries', 'Gas Refill'];

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: categories.map((cat) => CategoryItem(cat)).toList(),
      ),
    );
  }
}

class CategoryItem extends StatelessWidget {
  final String name;

  CategoryItem(this.name);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(8),
      child: ElevatedButton(
        child: Text(name),
        onPressed: () {
// Navigate to category screen
        },
      ),
    );
  }
}

class RecentProviders extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Text('Recent Providers',
              style: Theme.of(context).textTheme.headline6),
          Container(
            height: 200,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                ProviderItem(
                    name: 'Johnny Laundry',
                    imageUrl: 'assets/images/plumber.jpg',
                    t: ''),
                ProviderItem(
                    name: 'Sara Groceries',
                    imageUrl: 'assets/images/tutor.jpg',
                    t: ''),
              ],
            ),
          ),
        ],
      ),
    );
  }

  ProviderItem(
      {required String name,
      s,
      plumbing,
      required String t,
      required String imageUrl}) {}
}

class ProviderItem extends StatelessWidget {
  final String name;
  final String imageUrl;

  ProviderItem({required this.name, required this.imageUrl});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(8),
      width: 200,
      child: Column(
        children: [
          Image.asset(imageUrl),
          Text(name, style: TextStyle(fontSize: 18))
        ],
      ),
    );
  }
}
