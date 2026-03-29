import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Bool "mo:core/Bool";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type Category = {
    #rings;
    #necklaces;
    #earrings;
    #bracelets;
    #mens;
    #collections;
  };

  module Product {
    public type Product = {
      id : Nat;
      name : Text;
      category : Category;
      weightGrams : Float;
      makingCharge : Nat;
      description : Text;
      imageUrl : Text;
      inStock : Bool;
      featured : Bool;
    };

    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  type Product = Product.Product;

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Nat, Product>();

  var goldPricePerGramINR : Nat = 6200;

  // Access Control
  public type UserProfile = {
    name : Text;
    // Additional user info can be added here
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) { Runtime.trap("Admin access required") };
    if (products.containsKey(product.id)) { Runtime.trap("Product with this ID already exists") };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) { Runtime.trap("Admin access required") };
    if (not products.containsKey(product.id)) { Runtime.trap("Product does not exist") };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) { Runtime.trap("Admin access required") };
    if (not products.containsKey(productId)) { Runtime.trap("Product does not exist") };
    products.remove(productId);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    let filteredProducts = products.values().toArray().filter(
      func(p) { p.category == category }
    );
    filteredProducts.sort();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    let featuredProducts = products.values().toArray().filter(
      func(p) { p.featured }
    );
    featuredProducts.sort();
  };

  public query func getGoldPrice() : async Nat {
    goldPricePerGramINR;
  };

  public shared ({ caller }) func updateGoldPrice(newPrice : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) { Runtime.trap("Admin access required") };
    goldPricePerGramINR := newPrice;
  };

  // Initialization with sample data
  var initialized = false;

  system func preupgrade() {};
  system func postupgrade() {
    if (not initialized) {
      seedProducts();
      initialized := true;
    };
  };

  func seedProducts() {
    let sampleProducts = [
      {
        id = 1;
        name = "18K Diamond Ring";
        category = #rings;
        weightGrams = 3.1;
        makingCharge = 2500;
        description = "Elegant gold ring with solitaire diamond setting.";
        imageUrl = "https://urbenia.com/products/rings/diamond-solitaire.jpg";
        inStock = true;
        featured = true;
      },
      {
        id = 2;
        name = "22K Gold Necklace";
        category = #necklaces;
        weightGrams = 8.7;
        makingCharge = 6400;
        description = "Traditional gold necklace with intricate filigree work.";
        imageUrl = "https://urbenia.com/products/necklaces/gold-filigree.jpg";
        inStock = true;
        featured = true;
      },
      {
        id = 3;
        name = "Pearl Drop Earrings";
        category = #earrings;
        weightGrams = 4.3;
        makingCharge = 3200;
        description = "Dangling pearl earrings with gold embellishments.";
        imageUrl = "https://urbenia.com/products/earrings/pearl-drop.jpg";
        inStock = true;
        featured = false;
      },
      {
        id = 4;
        name = "18K Gold Bangle";
        category = #bracelets;
        weightGrams = 5.8;
        makingCharge = 4900;
        description = "Open gold bangle with hammered surface finish.";
        imageUrl = "https://urbenia.com/products/bracelets/gold-bangle.jpg";
        inStock = true;
        featured = true;
      },
      {
        id = 5;
        name = "20K Mens Chain";
        category = #mens;
        weightGrams = 13.1;
        makingCharge = 9000;
        description = "Thick, sturdy gold chain designed for men.";
        imageUrl = "https://urbenia.com/products/mens/gold-chain.jpg";
        inStock = false;
        featured = false;
      },
      {
        id = 6;
        name = "14K Diamond Studs";
        category = #earrings;
        weightGrams = 1.7;
        makingCharge = 1800;
        description = "Minimalist diamond stud earrings in white gold.";
        imageUrl = "https://urbenia.com/products/earrings/diamond-studs.jpg";
        inStock = true;
        featured = true;
      },
      {
        id = 7;
        name = "Platinum Wedding Band";
        category = #rings;
        weightGrams = 6.2;
        makingCharge = 5500;
        description = "Premium platinum band for mens wedding rings.";
        imageUrl = "https://urbenia.com/products/rings/platinum-band.jpg";
        inStock = true;
        featured = false;
      },
      {
        id = 8;
        name = "Diamond Tennis Bracelet";
        category = #bracelets;
        weightGrams = 7.9;
        makingCharge = 7100;
        description = "Continuous diamond setting in thin gold bracelet.";
        imageUrl = "https://urbenia.com/products/bracelets/diamond-tennis.jpg";
        inStock = true;
        featured = true;
      },
      {
        id = 9;
        name = "21K Antique Nose Ring";
        category = #collections;
        weightGrams = 2.4;
        makingCharge = 2100;
        description = "Classic south Indian style nose ring in 21K gold.";
        imageUrl = "https://urbenia.com/products/collections/nose-ring.jpg";
        inStock = false;
        featured = false;
      },
      {
        id = 10;
        name = "18K Gold Cufflinks";
        category = #mens;
        weightGrams = 3.5;
        makingCharge = 3200;
        description = "Luxury gold cufflinks for formal wear.";
        imageUrl = "https://urbenia.com/products/mens/cufflinks.jpg";
        inStock = true;
        featured = false;
      },
      {
        id = 11;
        name = "22K Mangalsutra";
        category = #necklaces;
        weightGrams = 7.2;
        makingCharge = 5800;
        description = "Traditional Indian wedding necklace in solid gold.";
        imageUrl = "https://urbenia.com/products/necklaces/mangalsutra.jpg";
        inStock = true;
        featured = true;
      },
      {
        id = 12;
        name = "Royal Ruby Ring";
        category = #collections;
        weightGrams = 2.8;
        makingCharge = 2600;
        description = "Magnificent gold ring with single large ruby.";
        imageUrl = "https://urbenia.com/products/collections/ruby-ring.jpg";
        inStock = true;
        featured = true;
      },
    ];
    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };
  };
};
