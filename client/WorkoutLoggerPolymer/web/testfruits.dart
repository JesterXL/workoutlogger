import 'package:polymer/polymer.dart';

@CustomTag('test-fruits')
class TestFruitsElement extends PolymerElement {
  final List fruits = toObservable(['apples', 'pears', 'bananas']);

	TestFruitsElement.created() : super.created();
}