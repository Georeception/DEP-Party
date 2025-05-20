import React, { useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  RadioGroup,
  Radio,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { shopData } from '../data/staticData';

const Shop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  const [showCheckout, setShowCheckout] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  // Event handlers
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
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

  const handleSubmitReview = () => {
    if (selectedProduct) {
      const review = {
        id: Date.now(),
        rating: newReview.rating,
        comment: newReview.comment,
        user: 'Anonymous User',
        date: new Date().toISOString()
      };
      setReviews([...reviews, review]);
      setNewReview({ rating: 0, comment: '' });
      setAlert({
        show: true,
        message: 'Review added successfully',
        severity: 'success'
      });
    }
  };

  const handleCheckout = () => {
    if (!selectedLocation) {
      setAlert({
        show: true,
        message: 'Please select a pickup location',
        severity: 'error'
      });
      return;
    }

    setCart([]);
    setShowCheckout(false);
    setAlert({
      show: true,
      message: 'Order placed successfully. Check your phone for payment prompt.',
      severity: 'success'
    });
  };

  return (
    <Box sx={{ py: 8, background: '#f9f9f9', minHeight: '100vh', mt: { xs: '114px', md: '114px' } }}>
      <Container maxWidth="lg">
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
          {shopData.products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                position: 'relative',
                background: 'linear-gradient(135deg, #ffeb3b 0%, #4caf50 100%)',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleProductClick(product)}
                />
                <CardContent sx={{ flexGrow: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
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
                <CardActions sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', p: 2 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={() => handleProductClick(product)}
                    sx={{
                      background: 'linear-gradient(45deg, #4caf50 30%, #ffeb3b 90%)',
                      fontWeight: 'bold'
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
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
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <Box key={review.id} sx={{ mb: 2 }}>
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
                {shopData.pickupLocations.map((location) => (
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