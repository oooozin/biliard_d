import { Grid, Skeleton, Button, Paper, Tooltip, Typography } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import React, { useEffect, useRef, useState } from 'react';
import { endpoints } from '../../../constants/endpoints';
import ProductModal from './ProductModal';
import { CounterItemToggle } from '../../../shares/shareSlice';
import { useDispatch } from 'react-redux';
import Default from '../../../assets/image/default-image.png'
import useScanDetection from 'use-scan-detection';

function ItemList({ data, loading, loadingData }) {

  const [selectedItem, setSelectedItem] = useState({})
  const [scannedCode, setScannedCode] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    const scannedData = data.find(item => item?.barcode === Number(scannedCode));
    console.log(scannedData);
    
    if (scannedData) {
      setSelectedItem(scannedData);
      dispatch(CounterItemToggle()); 
    } else {
      console.log('Barcode not found:', scannedCode);
    }
  }, [scannedCode]);

  useScanDetection({
    onComplete: (value) => setScannedCode(value.replace(/Tab/g, '')),
    minLength: 3
  })

  return (
    <>
    <Grid container spacing={2} sx={{ marginLeft: '1px' }}>
      {loading ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        data.filter(item => item.item_data && item.item_data.qty !== 0 && item.status === 'ACTIVE').map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper style={{ textAlign: 'center', padding: '8px' }}>
              <img 
                src={item.image ? `${endpoints.image}${item.image}` : Default}
                alt={item.name}
                style={{ height: 100, width: 100, objectFit: 'cover', borderRadius: '50%', margin: 'auto' }}
              />
              <Grid container>
                <Grid item xs={12}>
                  <Tooltip title={item.name}>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.name.length > 7 ? `${item.name.slice(0, 7)}...` : item.name}
                    </Typography>
                  </Tooltip>
                    <Typography variant="subtitle2" gutterBottom>
                      {item.item_data?.qty}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{`${item.price}mmk`}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={()=>{
                      setSelectedItem(item)
                      dispatch(CounterItemToggle());
                    }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AddShoppingCartOutlinedIcon />}
                    sx={{
                      mt: 1,
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                        color: '#fff',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    Order
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
    <ProductModal item={selectedItem} loadingData={()=>loadingData()}/>
    </>
  );
}

export default ItemList;
