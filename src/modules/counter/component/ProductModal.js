import { Box, Modal, Typography, Card, CardMedia, CardContent, Button, ButtonGroup, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { endpoints } from '../../../constants/endpoints';
import { CounterItemToggle } from '../../../shares/shareSlice';
import Default from '../../../assets/image/default-image.png'
import { counterService } from '../counterService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({ item, setItem, loadingData }) {
  const [count, setCount] = useState(1);
  const { showCounterItem, man } = useSelector(state => state.share);
  const { table } = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const alertToggleClick = () => {
    dispatch(CounterItemToggle());
  };

  const orderCreate = async () => {
    const payload = {
      order_id: table?.order_id,
      item_id: item?.id,
      price: item?.price,
      qty: count,
      total: item?.price * count,
      shop_id: man?.shop_id
    }
    await counterService.createinvoice(payload, dispatch);
    loadingData()
    alertToggleClick()
  }

  // const submitOrder = async () => {
  //   setLoading(true);
  //   const payload = { 
  //     table_number_id: selectTable,
  //     status: "PENDING", 
  //     shop_id: shopId
  //   }
  //   const create = await counterService.checkin(payload, dispatch);
  //   if(create.status == 200){
  //       navigate(`${paths.counter}/${selectTable}`);
  //   }
  //   setLoading(false);
  // };

  const handleIncrement = () => {
    if (count < (item.item_data?.qty || 1)) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight' || event.key === '+') {
        handleIncrement();
      } else if (event.key === 'ArrowLeft' || event.key === '-') {
        handleDecrement();
      } else if (event.key === 'Backspace') {
        if (count > 1) {
          setCount(prevCount => Math.floor(prevCount / 10));
        }
      } else if (!isNaN(event.key) && event.key !== ' ') {
        const newCount = parseInt(count.toString() + event.key);
        if (newCount <= (item.item_data?.qty || 1)) {
          setCount(newCount);
        }
      } else if (event.key === 'Enter') {
        orderCreate();
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [count, item, orderCreate]);

  return (
    <div>
      <Modal
        keepMounted
        open={showCounterItem}
        onClose={alertToggleClick}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              height="270"
              image={item.image ? `${endpoints.image}${item.image}` : Default}
              alt={item.name}
            />
            <CardContent style={{ textAlign: 'center' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom>{item.name}</Typography>    
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom>{item.price} MMK</Typography>
                </Grid>
                <Grid item xs={6}>
                  <ButtonGroup disableElevation aria-label="Disabled elevation buttons">
                    <Button onClick={handleDecrement} variant="contained">-</Button>
                    <Button variant="outlined" style={{ color: 'black' }}>{count}</Button>
                    <Button onClick={handleIncrement} variant="contained">+</Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ShoppingCartIcon />}
                    onClick={orderCreate}
                  >
                    Order
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
