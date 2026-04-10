import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [reservationStep, setReservationStep] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = [
    {
      id: 1,
      name: 'Coastal Prawn Curry',
      price: 650,
      category: 'Seafood',
      desc: 'Fresh prawns simmered in coconut milk with coastal spices and curry leaves',
      fullDesc: 'Succulent prawns cooked in a rich, aromatic coconut curry infused with ginger, garlic, green chilies, and fresh curry leaves. A taste of the Indian coastline.',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
      ingredients: ['Prawns', 'Coconut Milk', 'Curry Leaves', 'Ginger', 'Green Chili', 'Turmeric'],
      prepTime: '35 mins',
      veg: false,
      popular: true
    },
    {
      id: 2,
      name: 'Truffle Mushroom Risotto',
      price: 580,
      category: 'Vegetarian',
      desc: 'Creamy Arborio rice with wild mushrooms and black truffle oil',
      fullDesc: 'Slow-cooked Italian Arborio rice with a medley of wild mushrooms, finished with Parmesan, butter, and aromatic black truffle oil.',
      image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&q=80',
      ingredients: ['Arborio Rice', 'Wild Mushrooms', 'Truffle Oil', 'Parmesan', 'Butter', 'Thyme'],
      prepTime: '40 mins',
      veg: true,
      popular: true
    },
    {
      id: 3,
      name: 'Mediterranean Sea Bass',
      price: 720,
      category: 'Seafood',
      desc: 'Pan-seared sea bass with lemon caper butter and herb couscous',
      fullDesc: 'Perfectly seared sea bass fillet with crispy skin, served over fluffy herb couscous and drizzled with tangy lemon caper butter sauce.',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
      ingredients: ['Sea Bass', 'Couscous', 'Capers', 'Lemon', 'Butter', 'Fresh Herbs'],
      prepTime: '30 mins',
      veg: false,
      popular: true
    },
    {
      id: 4,
      name: 'Lamb Shank Massaman',
      price: 680,
      category: 'Main Course',
      desc: 'Slow-braised lamb shank in rich Massaman curry with potatoes',
      fullDesc: 'Tender lamb shank braised for hours in a fragrant Massaman curry with coconut milk, potatoes, peanuts, and aromatic spices.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      ingredients: ['Lamb Shank', 'Coconut Milk', 'Potatoes', 'Peanuts', 'Massaman Paste', 'Cinnamon'],
      prepTime: '3 hours',
      veg: false,
      popular: true
    },
    {
      id: 5,
      name: 'Burrata & Heirloom Tomato',
      price: 420,
      category: 'Appetizer',
      desc: 'Creamy burrata with heirloom tomatoes, basil pesto and aged balsamic',
      fullDesc: 'Fresh imported burrata cheese served with colorful heirloom tomatoes, house-made basil pesto, extra virgin olive oil, and 12-year aged balsamic.',
      image: 'https://images.unsplash.com/photo-1532499016263-2b473a0d2c0d?w=800&q=80',
      ingredients: ['Burrata', 'Heirloom Tomatoes', 'Basil Pesto', 'Balsamic', 'Olive Oil', 'Sea Salt'],
      prepTime: '15 mins',
      veg: true,
      popular: true
    },
    {
      id: 6,
      name: 'Duck Confit',
      price: 780,
      category: 'Main Course',
      desc: 'Crispy duck leg confit with orange gastrique and potato gratin',
      fullDesc: 'Duck leg slow-cooked in its own fat until tender, then crisped to perfection. Served with creamy potato gratin and orange gastrique.',
      image: 'https://images.unsplash.com/photo-1544739316-3e38a2ef0580?w=800&q=80',
      ingredients: ['Duck Leg', 'Duck Fat', 'Orange', 'Potatoes', 'Thyme', 'Garlic'],
      prepTime: '4 hours',
      veg: false,
      popular: false
    },
    {
      id: 7,
      name: 'Matcha Tiramisu',
      price: 320,
      category: 'Dessert',
      desc: 'Japanese-Italian fusion with matcha mascarpone and sake-soaked sponge',
      fullDesc: 'A unique twist on classic tiramisu featuring premium matcha green tea, creamy mascarpone, and delicate sponge soaked in sake.',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
      ingredients: ['Matcha', 'Mascarpone', 'Sponge Cake', 'Sake', 'White Chocolate', 'Cream'],
      prepTime: '30 mins',
      veg: true,
      popular: true
    },
    {
      id: 8,
      name: 'Grilled Octopus',
      price: 550,
      category: 'Appetizer',
      desc: 'Char-grilled octopus with smoked paprika, lemon and herb oil',
      fullDesc: 'Tender octopus tentacles grilled over charcoal, seasoned with smoked paprika, fresh lemon, and a drizzle of herb-infused olive oil.',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
      ingredients: ['Octopus', 'Smoked Paprika', 'Lemon', 'Olive Oil', 'Oregano', 'Garlic'],
      prepTime: '45 mins',
      veg: false,
      popular: true
    },
    {
      id: 9,
      name: 'Miso Black Cod',
      price: 850,
      category: 'Seafood',
      desc: 'Miso-marinated black cod with pickled vegetables and steamed rice',
      fullDesc: 'Buttery black cod marinated in sweet white miso for 48 hours, then broiled until caramelized. Served with house-pickled vegetables.',
      image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800&q=80',
      ingredients: ['Black Cod', 'White Miso', 'Sake', 'Mirin', 'Pickled Vegetables', 'Rice'],
      prepTime: '48 hours',
      veg: false,
      popular: true
    },
    {
      id: 10,
      name: 'Roasted Cauliflower Steak',
      price: 380,
      category: 'Vegetarian',
      desc: 'Thick-cut cauliflower steak with romesco sauce and almond crumble',
      fullDesc: 'Meaty cauliflower steak roasted until golden, served over smoky romesco sauce and topped with toasted almond and herb crumble.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      ingredients: ['Cauliflower', 'Romesco Sauce', 'Almonds', 'Herbs', 'Garlic', 'Olive Oil'],
      prepTime: '35 mins',
      veg: true,
      popular: false
    },
    {
      id: 11,
      name: 'Dark Chocolate Fondant',
      price: 340,
      category: 'Dessert',
      desc: 'Warm chocolate lava cake with vanilla bean ice cream',
      fullDesc: 'Decadent dark chocolate cake with a molten center, served warm with Madagascar vanilla bean ice cream and fresh berries.',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
      ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Vanilla Ice Cream', 'Berries', 'Cocoa'],
      prepTime: '25 mins',
      veg: true,
      popular: true
    },
    {
      id: 12,
      name: 'Wagyu Beef Tartare',
      price: 680,
      category: 'Appetizer',
      desc: 'Hand-cut Australian wagyu with quail egg, capers and crostini',
      fullDesc: 'Premium Australian wagyu beef hand-cut and seasoned with shallots, capers, cornichons, and topped with a quail egg yolk. Served with crispy crostini.',
      image: 'https://images.unsplash.com/photo-1546039907-7fa05f864ad0?w=800&q=80',
      ingredients: ['Wagyu Beef', 'Quail Egg', 'Capers', 'Shallots', 'Cornichons', 'Crostini'],
      prepTime: '20 mins',
      veg: false,
      popular: false
    }
  ];

  const features = [
    {
      icon: '🍷',
      title: 'Curated Wine List',
      desc: 'Over 200 labels from world-renowned vineyards, carefully selected by our sommelier',
      details: 'Our wine cellar features exceptional vintages from Bordeaux, Tuscany, Napa Valley, and emerging wine regions. Each wine is chosen to complement our menu perfectly.'
    },
    {
      icon: '👨‍🍳',
      title: 'Michelin-Trained Chef',
      desc: 'Chef Marco Laurent brings 20 years of experience from starred restaurants',
      details: 'Trained in Paris and having worked at three Michelin-starred establishments across Europe, Chef Marco combines classical French techniques with global flavors.'
    },
    {
      icon: '🌿',
      title: 'Farm-to-Table',
      desc: 'Seasonal ingredients sourced daily from local organic farms',
      details: 'We partner with twelve local farms within 50 miles to ensure the freshest produce, heritage meats, and sustainable seafood arrive at your table daily.'
    },
    {
      icon: '🎨',
      title: 'Artisanal Approach',
      desc: 'House-made pastas, breads, and cured meats crafted daily',
      fullDesc: 'Our kitchen produces fresh pasta, sourdough bread, charcuterie, and ferments in-house using traditional methods and premium ingredients.',
      details: 'Our kitchen produces fresh pasta, sourdough bread, charcuterie, and ferments in-house using traditional methods and premium ingredients.'
    }
  ];

  const gallery = [
    {
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      title: 'The Main Dining Room',
      category: 'Interior',
      description: 'Elegant ambiance with crystal chandeliers and velvet seating'
    },
    {
      image: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=800&q=80',
      title: 'Chef\'s Table Experience',
      category: 'Experience',
      description: 'Intimate 8-seat counter overlooking the open kitchen'
    },
    {
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      title: 'Wine Cellar',
      category: 'Cellar',
      description: 'Temperature-controlled cellar housing rare vintages'
    },
    {
      image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80',
      title: 'Private Dining Room',
      category: 'Private',
      description: 'Exclusive space for up to 20 guests with dedicated service'
    },
    {
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
      title: 'Garden Terrace',
      category: 'Outdoor',
      description: 'Al fresco dining surrounded by olive trees and herbs'
    },
    {
      image: 'https://images.unsplash.com/photo-1484659619202-ce3889a4c8b5?w=800&q=80',
      title: 'The Bar',
      category: 'Bar',
      description: 'Craft cocktails and rare spirits in an intimate setting'
    }
  ];

  const categories = ['All', 'Appetizer', 'Main Course', 'Seafood', 'Vegetarian', 'Dessert'];

  const filteredMenu = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
      setCartOpen(false);
    }, 4000);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <span className="logo-text">NOBLE<span className="logo-accent">TABLE</span></span>
          </div>
          
          <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            {['home', 'about', 'menu', 'features', 'gallery', 'reservations', 'help'].map((item) => (
              <button
                key={item}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-slideshow">
          <div className="hero-slide slide-1 active"></div>
          <div className="hero-slide slide-2"></div>
          <div className="hero-slide slide-3"></div>
        </div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span>★ Michelin Recommended 2024 ★</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Where Every Meal</span>
            <span className="title-line">Becomes A</span>
            <span className="title-line accent">Masterpiece</span>
          </h1>
          
          <p className="hero-subtitle">Fine Dining Reimagined</p>
          
          <p className="hero-description">
            Experience culinary artistry at Noble Table. Our Michelin-trained chefs craft 
            exceptional dishes using the finest seasonal ingredients, served in an atmosphere 
            of understated elegance.
          </p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('reservations')}>
              <span>Reserve a Table</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="btn btn-outline" onClick={() => scrollToSection('menu')}>
              <span>View Menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Wine Selection</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5★</span>
              <span className="stat-label">500+ Reviews</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>Scroll to discover</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-content-left">
              <span className="section-subtitle">Our Philosophy</span>
              <h2 className="section-title">Crafting <span className="text-gradient">Exceptional</span> Dining Experiences</h2>
              
              <div className="about-quote">
                <svg viewBox="0 0 24 24" fill="currentColor" className="quote-icon">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p>Great food is not just about taste—it's about creating moments that linger in memory long after the last bite.</p>
                <span className="quote-author">— Chef Marco Laurent</span>
              </div>
              
              <p className="about-text">
                Founded in 2012, Noble Table has established itself as a beacon of culinary excellence. 
                Our philosophy is simple: source the finest ingredients, honor traditional techniques, 
                and present each dish as a work of art. Every plate tells a story of passion, precision, 
                and creativity.
              </p>
              
              <p className="about-text">
                From our house-made pastas to our carefully curated wine cellar, every detail is 
                considered. We believe dining should be an experience that engages all the senses—a 
                celebration of food, wine, and connection.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-icon">🍝</span>
                  <div>
                    <h4>Fresh Pasta Daily</h4>
                    <p>Handmade each morning using organic flour and farm eggs</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">🥩</span>
                  <div>
                    <h4>Dry-Aged Beef</h4>
                    <p>In-house aging program for premium cuts</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">🍷</span>
                  <div>
                    <h4>Sommelier Selection</h4>
                    <p>Expertly paired wines for every course</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-content-right">
              <div className="about-image-main">
                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80" alt="Chef at work" />
                <div className="image-caption">Chef Marco Laurent in the kitchen</div>
              </div>
              <div className="about-image-grid">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" alt="Restaurant interior" />
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" alt="Plated dish" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">Our Culinary Offerings</span>
            <h2 className="section-title">The <span className="text-gradient">Menu</span></h2>
            <p className="section-description">Seasonal ingredients, masterfully prepared</p>
          </div>

          <div className="menu-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="menu-grid-alt">
            {filteredMenu.map((item) => (
              <div className="menu-card-alt" key={item.id} onClick={() => setSelectedProduct(item)}>
                <div className="menu-card-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  {item.popular && <span className="menu-badge">Chef's Pick</span>}
                </div>
                <div className="menu-card-content">
                  <div className="menu-card-header">
                    <h3>{item.name}</h3>
                    <span className="menu-price">₹{item.price}</span>
                  </div>
                  <p className="menu-card-desc">{item.desc}</p>
                  <div className="menu-card-footer">
                    <span className="menu-category-tag">{item.category}</span>
                    <button className="menu-add-btn" onClick={(e) => { e.stopPropagation(); addToCart(item); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">What Sets Us Apart</span>
            <h2 className="section-title">The Noble <span className="text-gradient">Difference</span></h2>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon-wrapper">
                  <span className="feature-emoji">{feature.icon}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <p className="feature-details">{feature.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">Our Space</span>
            <h2 className="section-title">Restaurant <span className="text-gradient">Gallery</span></h2>
            <p className="section-description">Step inside Noble Table</p>
          </div>

          <div className="gallery-masonry">
            {gallery.map((item, index) => (
              <div className={`gallery-item-masonry item-${index + 1}`} key={index}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-category">{item.category}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section id="reservations" className="reservations">
        <div className="section-container">
          <div className="reservations-wrapper">
            <div className="reservations-info">
              <span className="section-subtitle">Book Your Experience</span>
              <h2 className="section-title">Reserve <span className="text-gradient">Your Table</span></h2>
              
              <p className="reservations-intro">
                We recommend booking at least 2-3 days in advance for weekend dining. 
                For parties of 6 or more, please contact us directly.
              </p>

              <div className="info-cards">
                <div className="info-card">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4>Hours</h4>
                    <p>Mon-Thu: 5pm - 10pm</p>
                    <p>Fri-Sat: 5pm - 11pm</p>
                    <p>Sun: 4pm - 9pm</p>
                  </div>
                </div>
                
                <div className="info-card">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h4>Contact</h4>
                    <p>+1 (212) 555-0198</p>
                    <p>reservations@nobletable.com</p>
                  </div>
                </div>

                <div className="info-card">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h4>Location</h4>
                    <p>123 Gourmet Avenue</p>
                    <p>SoHo, New York, NY 10012</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reservations-form-wrapper">
              <div className="reservation-progress">
                <div className={`progress-step ${reservationStep >= 1 ? 'active' : ''}`}>
                  <span className="step-number">1</span>
                  <span className="step-label">Details</span>
                </div>
                <div className={`progress-step ${reservationStep >= 2 ? 'active' : ''}`}>
                  <span className="step-number">2</span>
                  <span className="step-label">Confirm</span>
                </div>
              </div>

              <form className="reservations-form" onSubmit={(e) => { e.preventDefault(); alert('Reservation request received! We will contact you shortly to confirm.'); }}>
                <div className="form-row-dual">
                  <div className="form-group">
                    <input type="text" placeholder="Full Name" required className="form-input" />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email Address" required className="form-input" />
                  </div>
                </div>

                <div className="form-row-dual">
                  <div className="form-group">
                    <input type="tel" placeholder="Phone Number" required className="form-input" />
                  </div>
                  <div className="form-group">
                    <select required className="form-input form-select">
                      <option value="">Number of Guests</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6+">6+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-dual">
                  <div className="form-group">
                    <input type="date" required className="form-input" />
                  </div>
                  <div className="form-group">
                    <select required className="form-input form-select">
                      <option value="">Select Time</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <textarea placeholder="Special Requests, Dietary Restrictions, or Occasion" rows="3" className="form-input"></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  <span>Request Reservation</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section id="help" className="section-container help-section">
        <div className="section-header">
          <span className="section-subtitle">Any Questions?</span>
          <h2 className="section-title">Help & FAQs</h2>
          <p className="section-description">Find answers to common questions about our restaurant, menu, and services</p>
        </div>

        <div className="faq-container">
          {[
            {
              q: "What are your operating hours?",
              a: "We're open Tuesday to Sunday from 12:00 PM to 11:00 PM. Closed on Mondays. We recommend calling ahead for peak hours."
            },
            {
              q: "How do I make a reservation?",
              a: "You can book a table through our Reservations section above, or call us at +91-XXXXX-XXXXX. We accept reservations up to 2 months in advance."
            },
            {
              q: "Do you accommodate dietary restrictions?",
              a: "Absolutely! We cater to vegan, vegetarian, gluten-free, and allergy requirements. Please let us know when booking so our team can prepare accordingly."
            },
            {
              q: "What's your dress code?",
              a: "Smart casual to formal attire is recommended. We appreciate guests who dress appropriately for a fine dining experience."
            },
            {
              q: "Do you have a wine pairing service?",
              a: "Yes! Our sommelier can suggest perfect wine pairings for your meal. We have an extensive wine collection featuring labels from around the world."
            },
            {
              q: "Can we host private events?",
              a: "Certainly! Contact us for information about private dining events, business functions, and celebrations."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards (Visa, Mastercard, American Express), digital payments (PayPal, Apple Pay), and cash."
            },
            {
              q: "Is there a dress code for the restaurant?",
              a: "Smart casual to formal attire is preferred. We maintain an elegant ambiance throughout the restaurant."
            },
            {
              q: "Do you offer takeout or delivery?",
              a: "We primarily focus on dine-in experiences. For special requests, please contact us directly at the reservation number."
            },
            {
              q: "Can I cancel or modify my reservation?",
              a: "Yes, you can modify up to 24 hours before your reservation. Cancellations within 24 hours may have a cancellation fee."
            }
          ].map((faq, idx) => (
            <div key={idx} className="faq-item">
              <button 
                className="faq-question"
              >
                <span>{faq.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h3>Still have questions?</h3>
          <p>Contact our team directly for personalized assistance</p>
          <div className="faq-contact-info">
            <div className="contact-box">
              <span className="box-label">Email</span>
              <span className="box-value">info@nobletable.com</span>
            </div>
            <div className="contact-box">
              <span className="box-label">Phone</span>
              <span className="box-value">+91-XXXXX-XXXXX</span>
            </div>
            <div className="contact-box">
              <span className="box-label">Hours</span>
              <span className="box-value">Tue-Sun, 12-11 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="footer-logo">NOBLE<span>TABLE</span></h3>
              <p className="footer-tagline">Culinary excellence since 2012</p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg></a>
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
              </div>
            </div>

            <div className="footer-links-group">
              <div className="footer-links">
                <h4>Explore</h4>
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
                <a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>Menu</a>
                <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
                <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a>
              </div>

              <div className="footer-links">
                <h4>Information</h4>
                <a href="#reservations" onClick={(e) => { e.preventDefault(); scrollToSection('reservations'); }}>Reservations</a>
                <a href="#help" onClick={(e) => { e.preventDefault(); scrollToSection('help'); }}>Help & FAQs</a>
                <a href="#">Private Events</a>
                <a href="#">Gift Cards</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
              </div>

              <div className="footer-newsletter">
                <h4>Newsletter</h4>
                <p>Subscribe for seasonal menus and exclusive events</p>
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Your email" />
                  <button type="submit">→</button>
                </form>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Noble Table. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <span>|</span>
              <a href="#">Terms of Service</a>
              <span>|</span>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="modal-grid">
              <div className="modal-image-section">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              
              <div className="modal-details-section">
                <div className="modal-header">
                  <h2>{selectedProduct.name}</h2>
                  <span className="modal-category">{selectedProduct.category}</span>
                  <span className="modal-price">₹{selectedProduct.price}</span>
                </div>
                
                <p className="modal-description">{selectedProduct.fullDesc}</p>
                
                <div className="modal-meta">
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Prep: {selectedProduct.prepTime}</span>
                  </div>
                </div>
                
                <div className="modal-ingredients">
                  <h4>Ingredients</h4>
                  <div className="ingredients-cloud">
                    {selectedProduct.ingredients.map((ingredient, i) => (
                      <span key={i} className="ingredient-tag">{ingredient}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="btn btn-secondary" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                    Add to Order
                  </button>
                  <button className="btn btn-primary" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); placeOrder(); }}>
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>
          <div className="cart-sidebar">
            <div className="cart-header">
              <h3>Your Order</h3>
              <button className="cart-close" onClick={() => setCartOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p>Your cart is empty</p>
                  <button className="btn btn-primary" onClick={() => { setCartOpen(false); scrollToSection('menu'); }}>
                    Browse Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <span className="cart-item-price">₹{item.price}</span>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <button className="btn btn-primary btn-full" onClick={placeOrder}>
                  Place Order
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Order Success Modal */}
      {orderPlaced && (
        <div className="order-success-overlay">
          <div className="order-success-modal">
            <div className="success-icon">
              <svg viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path fill="none" stroke="currentColor" strokeWidth="3" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for choosing Noble Table.</p>
            <p className="order-message">Your culinary experience awaits.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;