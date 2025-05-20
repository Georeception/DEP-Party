export const leadershipData = [
  {
    id: 1,
    name: "Lenny Kivuti",
    position: {
      title: "National Chairman",
      description: "Leading the party with vision and integrity"
    },
    image: "/images/kivuti.png",
    bio: "Lenny Kivuti has been a dedicated leader in our party for over 15 years, bringing extensive experience in public service and community development."
  },
  {
    id: 2,
    name: "Kiraitu Murungi",
    position: {
      title: "Party Leader",
      description: "Supporting the party's mission"
    },
    image: "/images/leader.png",
    bio: "Kiraitu Murungi brings a wealth of experience in policy development and community engagement to our leadership team."
  },
  {
    id: 3,
    name: "Titus Ntachiu",
    position: {
      title: "Deputy Party Leader",
      description: "Managing party operations"
    },
    image: "/images/dpl.jfif",
    bio: "Michael Johnson oversees the day-to-day operations of the party, ensuring smooth coordination across all departments."
  }
];

export const newsData = [
  {
    id: 1,
    title: "Party Announces New Initiatives",
    content: "The party has announced several new initiatives aimed at improving community welfare and development.",
    image: "/images/campaign.png",
    created_at: "2024-03-15"
  },
  {
    id: 2,
    title: "Community Outreach Program Success",
    content: "Our recent community outreach program has successfully reached over 10,000 citizens across the region.",
    image: "/images/croc.png",
    created_at: "2024-03-10"
  },
  {
    id: 3,
    title: "Youth Empowerment Summit",
    content: "The party hosted a successful youth empowerment summit, bringing together young leaders from across the country.",
    image: "/images/people.png",
    created_at: "2024-03-05"
  }
];

export const eventsData = [
  {
    id: 1,
    title: "Annual Party Convention",
    description: "Join us for our annual party convention where we'll discuss our vision for the future.",
    date: "2024-04-15",
    time: "09:00 AM",
    location: "Nairobi Convention Centre",
    image: "/images/people.png",
    category: "Convention"
  },
  {
    id: 2,
    title: "Community Town Hall",
    description: "A town hall meeting to discuss local issues and community development.",
    date: "2024-04-20",
    time: "02:00 PM",
    location: "Community Hall",
    image: "/images/croc.png",
    category: "Meeting"
  },
  {
    id: 3,
    title: "Youth Leadership Workshop",
    description: "A workshop focused on developing leadership skills among young party members.",
    date: "2024-04-25",
    time: "10:00 AM",
    location: "Youth Center",
    image: "/images/campaign.png",
    category: "Workshop"
  }
];

export const galleryData = {
  images: [
    {
      id: 1,
      title: "Party Rally 2024",
      description: "A successful rally bringing together thousands of supporters",
      image: "/images/people.png",
      created_at: "2024-03-01",
      media_type: "image"
    },
    {
      id: 2,
      title: "Community Service",
      description: "Party members participating in community service activities",
      image: "/images/croc.png",
      created_at: "2024-02-15",
      media_type: "image"
    },
    {
      id: 3,
      title: "Leadership Meeting",
      description: "Strategic planning session with party leadership",
      image: "/images/campaign.png",
      created_at: "2024-02-01",
      media_type: "image"
    }
  ],
  videos: [
    {
      id: 4,
      title: "Party Vision 2024",
      description: "Our vision for the future of our nation",
      video: "/video/ad.mp4",
      thumbnail: "/images/people.png",
      created_at: "2024-03-10",
      media_type: "video"
    },
    {
      id: 5,
      title: "Community Impact",
      description: "See how we're making a difference in communities",
      video: "/video/ad.mp4",
      thumbnail: "/images/campaign.png",
      created_at: "2024-02-20",
      media_type: "video"
    }
  ]
};

export const shopData = {
  products: [
    {
      id: 1,
      name: "Party T-Shirt",
      description: "High-quality cotton t-shirt with party logo",
      price: 1500,
      image: "/images/tshirt.jpeg",
      stock: 100,
      category: "Apparel"
    },
    {
      id: 2,
      name: "Party Cap",
      description: "Stylish cap with embroidered party logo",
      price: 800,
      image: "/images/cap.jpeg",
      stock: 50,
      category: "Accessories"
    },
    {
      id: 3,
      name: "Party Hoodie",
      description: "Hoodie with party logo",
      price: 500,
      image: "/images/hood.jpeg",
      stock: 75,
      category: "Merchandise"
    }
  ],
  pickupLocations: [
    {
      id: 1,
      name: "Nairobi Office",
      address: "123 Main Street, Nairobi"
    },
    {
      id: 2,
      name: "Mombasa Office",
      address: "456 Beach Road, Mombasa"
    }
  ]
}; 