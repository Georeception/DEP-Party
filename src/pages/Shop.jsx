import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Modal,
  IconButton,
  Chip,
  Stack,
  Divider,
  Rating,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import PageHero from '../components/PageHero';
import {
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { shopApi, pickupLocationsApi } from '../services/api';

const Shop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [pickupLocations, setPickupLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  const [showCheckout, setShowCheckout] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  // Load initial data
  useEffect(() => {
    loadProducts();
    loadPickupLocations();
  }, []);

  // Load product details when selected
  useEffect(() => {
    if (selectedProduct) {
      loadSimilarProducts(selectedProduct.id);
      loadProductReviews(selectedProduct.id);
    }
  }, [selectedProduct]);

  // API calls
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await shopApi.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSimilarProducts = async (productId) => {
    try {
      const data = await shopApi.getSimilarProducts(productId);
      setSimilarProducts(data);
    } catch (err) {
      console.error('Failed to load similar products:', err);
    }
  };

  const loadProductReviews = async (productId) => {
    try {
      const data = await shopApi.getProductReviews(productId);
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const loadPickupLocations = async () => {
    try {
      const response = await pickupLocationsApi.getAll();
      // The response.data might be nested in a results array
      const locations = response.data?.results || response.data || [];
      setPickupLocations(locations);
    } catch (err) {
      console.error('Failed to load pickup locations:', err);
      setPickupLocations([]);
    }
  };

  // Event handlers
  const handleProductClick = async (product) => {
    try {
      setSelectedProduct(product);
      setSelectedImage(0);
      
      // Load similar products from the same category
      if (product.category) {
        const similarData = await shopApi.getSimilarProducts(product.category);
        // Filter out the current product from similar products
        setSimilarProducts(similarData.filter(p => p.id !== product.id));
      }
    } catch (err) {
      console.error('Error loading product details:', err);
      setAlert({
        show: true,
        message: 'Failed to load product details',
        severity: 'error'
      });
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setAlert({
      show: true,
      message: 'Added to cart',
      severity: 'success'
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleSubmitReview = async () => {
    try {
      await shopApi.addProductReview(selectedProduct.id, newReview);
      await loadProductReviews(selectedProduct.id);
      setNewReview({ rating: 0, comment: '' });
      setAlert({
        show: true,
        message: 'Review added successfully',
        severity: 'success'
      });
    } catch (err) {
      setAlert({
        show: true,
        message: 'Failed to add review',
        severity: 'error'
      });
    }
  };

  const handleCheckout = async () => {
    if (!selectedLocation) {
      setAlert({
        show: true,
        message: 'Please select a pickup location',
        severity: 'error'
      });
      return;
    }

    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        pickup_location: selectedLocation,
      };

      const order = await shopApi.createOrder(orderData);
      const payment = await shopApi.initiatePayment(order.id, 'mpesa_stk');

      setCart([]);
      setShowCheckout(false);
      setAlert({
        show: true,
        message: 'Order placed successfully. Check your phone for payment prompt.',
        severity: 'success'
      });
    } catch (err) {
      setAlert({
        show: true,
        message: err.response?.data?.message || 'Failed to place order',
        severity: 'error'
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <PageHero
        tag="Store"
        title="Party Merchandise"
        subtitle="Support the movement with official merchandise and accessories."
      />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header with cart icon */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Party Merchandise Shop
          </Typography>
          <IconButton onClick={() => setShowCart(true)} color="primary">
            <ShoppingCartIcon />
            {cart.length > 0 && (
              <Chip
                label={cart.length}
                size="small"
                color="secondary"
                sx={{ position: 'absolute', top: -8, right: -8 }}
              />
            )}
          </IconButton>
        </Box>

        {/* Product Grid */}
        <Grid container spacing={4}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id || product.slug}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}>
                  {product.discount > 0 && (
                    <Chip
                      label={`-${product.discount}%`}
                      color="error"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1,
                        fontWeight: 'bold'
                      }}
                    />
                  )}
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ 
                      objectFit: 'contain', 
                      p: 2,
                      backgroundColor: '#f5f6f2',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleProductClick(product)}
                  />
                  <CardContent sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        mb: 1,
                        height: '3em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                        KES {product.price?.toLocaleString()}
                      </Typography>
                      {product.original_price && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            textDecoration: 'line-through',
                            fontWeight: 'medium'
                          }}
                        >
                          KES {product.original_price?.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ backgroundColor: '#ffffff', p: 2 }}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => handleProductClick(product)}
                      sx={{
                        backgroundColor: 'primary.main',
                        fontWeight: 'bold'
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No products available
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Product Detail Modal */}
        <Modal
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          aria-labelledby="product-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '80%', md: '70%' },
            maxWidth: 1000,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }}>
            {selectedProduct && (
              <>
                <IconButton
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                  onClick={() => setSelectedProduct(null)}
                >
                  <CloseIcon />
                </IconButton>

                <Grid container spacing={4}>
                  {/* Product Images */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '400px',
                          objectFit: 'contain',
                          borderRadius: 8
                        }}
                      />
                      {selectedProduct.images && selectedProduct.images.length > 0 && (
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mt: 2, overflowX: 'auto', pb: 1 }}
                        >
                          {selectedProduct.images.map((image, index) => (
                            <Box
                              key={index}
                              component="img"
                              src={image}
                              alt={`${selectedProduct.name} ${index + 1}`}
                              sx={{
                                width: 80,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 1,
                                cursor: 'pointer',
                                border: selectedImage === index ? '2px solid' : 'none',
                                borderColor: 'primary.main'
                              }}
                              onClick={() => setSelectedImage(index)}
                            />
                          ))}
                        </Stack>
                      )}
                    </Box>
                  </Grid>

                  {/* Product Info */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                      {selectedProduct.name}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                      KES {selectedProduct.price?.toLocaleString()}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedProduct.description}
                    </Typography>

                    {/* Stock Status */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" color={selectedProduct.stock > 0 ? 'success.main' : 'error.main'}>
                        {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={() => addToCart(selectedProduct)}
                      disabled={selectedProduct.stock <= 0}
                      sx={{ mb: 2 }}
                    >
                      Add to Cart
                    </Button>

                    {/* Reviews */}
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" gutterBottom>
                        Reviews
                      </Typography>
                      {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                        selectedProduct.reviews.map((review, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Rating value={review.rating} readOnly size="small" />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {review.comment}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              By {review.user}
                            </Typography>
                            <Divider sx={{ mt: 1 }} />
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No reviews yet
                        </Typography>
                      )}

                      {/* Add Review Form */}
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Add a Review
                        </Typography>
                        <Rating
                          value={newReview.rating}
                          onChange={(event, newValue) => {
                            setNewReview({ ...newReview, rating: newValue });
                          }}
                        />
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          variant="outlined"
                          placeholder="Write your review..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          sx={{ mt: 2 }}
                        />
                        <Button
                          variant="contained"
                          onClick={handleSubmitReview}
                          sx={{ mt: 2 }}
                        >
                          Submit Review
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Similar Products
                    </Typography>
                    <Grid container spacing={2}>
                      {similarProducts.map((product) => (
                        <Grid item xs={6} sm={4} md={3} key={product.id}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="140"
                              image={product.image}
                              alt={product.name}
                              sx={{ objectFit: 'contain' }}
                            />
                            <CardContent>
                              <Typography variant="subtitle1" noWrap>
                                {product.name}
                              </Typography>
                              <Typography variant="body2" color="primary">
                                KES {product.price?.toLocaleString()}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                size="small"
                                fullWidth
                                onClick={() => handleProductClick(product)}
                              >
                                View
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Modal>

        {/* Cart Modal */}
        <Modal
          open={showCart}
          onClose={() => setShowCart(false)}
          aria-labelledby="cart-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '95%' : 600,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }}>
            <Typography variant="h5" gutterBottom>
              Shopping Cart
            </Typography>

            {cart.length === 0 ? (
              <Typography>Your cart is empty</Typography>
            ) : (
              <>
                {cart.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="body2">
                          KES {item.price.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          inputProps={{ min: 1 }}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          color="error"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}

                <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
                  Total: KES {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                  }}
                >
                  Proceed to Checkout
                </Button>
              </>
            )}
          </Box>
        </Modal>

        {/* Checkout Modal */}
        <Modal
          open={showCheckout}
          onClose={() => setShowCheckout(false)}
          aria-labelledby="checkout-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '95%' : 600,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }}>
            <Typography variant="h5" gutterBottom>
              Checkout
            </Typography>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel>Select Pickup Location</InputLabel>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                label="Select Pickup Location"
              >
                {pickupLocations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name} - {location.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
              Payment will be processed via M-PESA STK Push
            </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={handleCheckout}
              disabled={!selectedLocation}
            >
              Place Order & Pay
            </Button>
          </Box>
        </Modal>

        {/* Alert Snackbar */}
        <Snackbar
          open={alert.show}
          autoHideDuration={6000}
          onClose={() => setAlert({ ...alert, show: false })}
        >
          <Alert
            onClose={() => setAlert({ ...alert, show: false })}
            severity={alert.severity}
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Shop; 