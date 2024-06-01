import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Divider, IconButton } from '@mui/material';
import { counterService } from '../counterService';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { CheckoutToggle } from '../../../shares/shareSlice';
import CheckoutModal from './CheckoutModal';
import { useEffect, useState } from 'react';

export default function CartList({loadingData}) {

  const { order, table } = useSelector(state => state.counter);
  const { man } = useSelector(state => state.share);
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch()
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [order?.checkout]);

  const checkinDate = new Date(order?.checkin);
  const formattedCheckinDate = checkinDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const checkoutDate = order?.checkout ? new Date(order?.checkout) : currentTime;
  const formattedCheckoutDate = order?.checkout ? new Date(order?.checkout).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }) : currentTime;
  const diffTime = Math.abs(checkoutDate - checkinDate);
  const totalMinutes = Math.ceil(diffTime / (1000 * 60));
  const totalTime = `${Math.floor(totalMinutes / 60).toString().padStart(2, '0')}:${(totalMinutes % 60).toString().padStart(2, '0')}:${Math.floor((diffTime / 1000) % 60).toString().padStart(2, '0')}`;

  const chargePerHalfHour = table?.amount || 0;
  const totalCharge = Math.ceil(totalMinutes / 30) * chargePerHalfHour;

  const totalQty = order?.invoices.reduce((acc, cur) => acc + cur.qty, 0);
  const itemTotal = order?.invoices.reduce((acc, cur) => acc + cur.total, 0);
  const formattedItemTotal = itemTotal?.toLocaleString();
  const grandTotal = order?.table_charge ? parseInt(order?.table_charge) : totalCharge + itemTotal;
  const formattedGrandTotal = grandTotal?.toLocaleString();

  const checkoutOrder = () => {
    dispatch(CheckoutToggle())
  }

  const deleteInvoice = async (item_id, id) => {
    const payload = {
      item_id: item_id,
      shop_id: man?.shop_id
    }
    const create = await counterService.deleteinvoice(payload, id , dispatch);
    if(create.status == 200){
      loadingData()
    }
  }

  return (
    <Box>
      <Paper elevation={3} style={{ margin: 6 }}>
        <TableContainer >
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem'}} >Start Time</TableCell>            
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem'}} >End Time</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem'}} >Time</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem'}} >Total</TableCell>           
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>                
                  <TableCell align="left">{formattedCheckinDate}</TableCell>             
                  <TableCell align="left">{order?.checkout ? formattedCheckoutDate : currentTime.toLocaleString()}</TableCell>
                  <TableCell align="left">{totalTime}</TableCell>
                  <TableCell align="left">{order?.table_charge ? order?.table_charge : totalCharge?.toLocaleString()}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={3} style={{ margin: 6 }}>
        <TableContainer >
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem'}} >Item Name</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem'}} >Price</TableCell>            
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem'}} >Qty</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '1rem'}} >Total</TableCell>           
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.invoices.map((row) => (
                <TableRow key={row?.item?.id} >                
                  <TableCell align="left">{row?.item?.name}</TableCell>
                  <TableCell align="left">{row?.item?.price}</TableCell>             
                  <TableCell align="left">{row?.qty}</TableCell>              
                  <TableCell align="left">{row?.total}</TableCell>
                  <TableCell align="left" style={{ padding: 0 }} >
                    <IconButton onClick={()=>deleteInvoice(row?.item?.id, row?.id)}>
                      <DeleteIcon style={{ color: 'red' }}/>
                    </IconButton>
                    </TableCell>             
                </TableRow>
              ))}
                <TableRow >                
                  <TableCell align="left" colSpan={2}>Item Total</TableCell>
                  <TableCell align="left" >{totalQty}</TableCell>
                  <TableCell align="left" >{formattedItemTotal}</TableCell>                          
                </TableRow>
                <TableRow >
                  <TableCell align="left" colSpan={3}>Total</TableCell>
                  <TableCell align="left" >{formattedGrandTotal}</TableCell>                          
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box display="flex" justifyContent="flex-end" sx={{ p:1 }}>
        <Button variant="contained" disabled={currentTime < checkoutDate} onClick={()=>checkoutOrder()} endIcon={<ShoppingCartCheckoutIcon />}>
          Checkout
        </Button>
      </Box>
      <CheckoutModal totalQty={totalQty} itemTotal={itemTotal} total={grandTotal} totaltime={totalTime} endtime={currentTime} totalCharge={totalCharge}/>
    </Box>
  );
}
