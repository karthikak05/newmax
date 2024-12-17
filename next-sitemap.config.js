module.exports = {
    siteUrl : "https://www.newmaxrepair.com",
    additionalPaths: async (config) => {
      const result = [];
  
      // Products
      result.push({ loc: '/products' ,priority:1.0});

      result.push({ loc: '/categories' ,priority:0.7});
      result.push({ loc: '/custom-procurement' ,priority:0.8});
      result.push({ loc: '/cart' ,priority:0.8});
      result.push({ loc: '/about-us' ,priority:0.8});
      result.push({ loc: '/contact-us' ,priority:0.7});
    
      return result;
    },
  };
  