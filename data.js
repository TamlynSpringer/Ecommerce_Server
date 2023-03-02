import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      email: "user@example.com",
      password: bcrypt.hashSync("Tt12345"),
      isAdmin: false,
    },
    {
      email: "seller@example.com",
      password: bcrypt.hashSync("Tt12345"),
      isAdmin: false,
      isSeller: true
    },
    {
      email: "admin@example.com",
      password: bcrypt.hashSync("Tt12345"),
      isAdmin: true,
    },
    {
      email: "tamlyn@super.admin",
      password: bcrypt.hashSync("Tt12345"),
      isAdmin: true,
      isSeller: true
    }
  ],
  products: [
    {
      name: "Star movie",
      sku: "movie1",
      category: "Movies",
      image: "http://dummyimage.com/450x600.png/fca36f/ffffff",
      price: 3.56,
      countInStock: 33,
      brand: "Star Bulk Carriers Corp.",
      rating: 4.5,
      numReviews: 10,
      description: "Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante."
    },
    {
      name: "Beauty shoe",
      sku: "shoe1",
      category: "Shoes",
      image: "http://dummyimage.com/450x600.png/5a8b5a/ffffff",
      price: 3.90,
      countInStock: 48,
      brand: "Sally Beauty Holdings, Inc.",
      rating: 4,
      numReviews: 10,
      description: "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy."
    },
    {
      name: "Anthera grocery",
      sku: "grocery1",
      category: "Grocery",
      image: "http://dummyimage.com/450x600.png/5fa2dd/ffffff",
      price: 5.75,
      countInStock: 28,
      brand: "Anthera Pharmaceuticals, Inc.",
      rating: 5,
      numReviews: 10,
      description: "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. "
    },
    {
      name: "Motorola toy",
      sku: "toy1",
      category: "Toys",
      image: "http://dummyimage.com/450x600.png/b17dae/ffffff",
      price: 1.01,
      countInStock: 48,
      brand: "Motorola Solutions, Inc.",
      rating: 3.5,
      numReviews: 10,
      description: "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros."
    },
    {
      name: "Veritex movie",
      sku: "movie2",
      category: "Movies",
      image: "http://dummyimage.com/450x600.png/fca36f/ffffff",
      price: 0.92,
      countInStock: 26,
      brand: "Veritex Holdings, Inc.",
      rating: 4,
      numReviews: 10,
      description: "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero."
    },
    
  ]
}

export default data;