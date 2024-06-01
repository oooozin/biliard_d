/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import { 
    Box, Modal, Table , 
    TableBody , TableCell , TableContainer ,
    TableHead , TableRow , Paper, Grid,
    TextField , Stack , MenuItem , Select,
    Button,
    InputLabel,
    Typography
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../../constants/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutToggle } from '../../../shares/shareSlice';
import { getRequest } from '../../../helpers/api';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import CircularProgress from '@mui/material/CircularProgress';
import { counterService } from '../counterService';
import { paths } from '../../../constants/paths';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '85%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CheckoutModal({ totalQty, itemTotal, total, totaltime, endtime, totalCharge }) {

    const [ charge, setCharge ] = useState(0)
    const [ refund, setRefund ] = useState(0)
    const [ customers, setCustomers ] = useState([])
    const [ payments, setPayments ] = useState([])
    const [ customer, setCustomer ] = useState()
    const [ payment, setPayment ] = useState()
    const [ loading, setLoading ] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    const { order, table } = useSelector(state => state.counter);
    const { showCheckout } = useSelector(state => state.share);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loadingData = useCallback(async () => {
        setLoading(true);
        const customerResult = await getRequest(`${endpoints.customer}`);
        if (customerResult.status === 200) {
            setCustomers(customerResult.data);
        }
        const paymentResult = await getRequest(`${endpoints.payment}`);
        if (paymentResult.status === 200) {
            setPayments(paymentResult.data);
        }
        setLoading(false);
    }, []);

    const Checkout = async () => {
        setLoading(true)
        const payload = {
          table_number_id: order?.table_number_id,
          customer_id: customer,
          payment_id: payment,
          table_charge: totalCharge,
          items_charge: itemTotal,
          total_time: totaltime,
          charge: total,
          refund: refund,
          checkout: endtime
        }
        const checkout = await counterService.checkout(payload, order?.id , dispatch);
        if(checkout.status == 200){
            navigate(paths.counter)
        }
    }

    useEffect(() => {
        setRefund(charge - total)
    }, [charge, total])
    
    useEffect(() => {
        loadingData();
    }, [loadingData]);

  return (
    <div>
      <Modal
        keepMounted
        open={showCheckout}
        onClose={()=>{dispatch(CheckoutToggle())}}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
            <Grid container sx={{ marginBottom: 2 }} >
                <Grid item xs={12}>
                    <Typography variant='h6'>{order?.invoice_number}</Typography>
                </Grid>
                {customers ? (
                    <Grid item xs={4} sx={{ marginRight: 2 }}>
                        <Stack spacing={1}>
                            <InputLabel > Customer </InputLabel>
                            <Select
                                id="customer"
                                name="customer"
                                value={customer}
                            >
                                {customers.map((e)=>(
                                    <MenuItem onChange={()=>{setCustomer(e.id)}} value={e.id}>{e.name}</MenuItem>
                                ))}
                            </Select>  
                        </Stack>
                    </Grid>
                ) : null}
                {payments ? (
                    <Grid item xs={4}>
                        <Stack spacing={1}>
                            <InputLabel > Payment </InputLabel>
                            <Select
                                id="payment"
                                name="payment"
                                value={payment}
                            >
                                {payments.map((e)=>(
                                    <MenuItem onChange={()=>{setPayment(e.id)}} value={e.id}>{e.name}</MenuItem>
                                ))}
                            </Select>  
                            <ValidationMessage field={"payment"} />
                        </Stack>
                    </Grid>
                ) : null}
            </Grid>
            <TableContainer sx={{ minWidth: 350, maxHeight: 500, mr: 1 }} component={Paper} >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {order?.invoices.map((row,index) => (
                        <TableRow
                            key={row?.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >            
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell component="th" scope="row">{row?.item?.name}</TableCell>
                            <TableCell align="right">{row?.item?.price}</TableCell>
                            <TableCell align="right">{row?.qty}</TableCell>
                            <TableCell align="right">{row?.total}</TableCell>
                        </TableRow>
                    ))}
                        <TableRow>
                            <TableCell colSpan={3}>Item Total</TableCell>
                            <TableCell align="right">{totalQty}</TableCell>
                            <TableCell align="right">{itemTotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell align="right" sx={{ fontSize: '20px' }}>{total.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>Charge</TableCell>
                            <TableCell align="right">
                                <TextField onChange={(e)=>{setCharge(Number(e.target.value))}} value={charge} variant="standard" sx={{ width: '80px' }} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>Refund</TableCell>
                            <TableCell align="right" sx={{ color: refund < 0 ? 'red':'black', fontSize: '20px' }}>{refund.toLocaleString()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'center',mt: '10px' }}>
                  <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: '100px' }}
                        onClick={()=>{Checkout()}}
                        endIcon={ loading ? <CircularProgress size={18} /> : <TableRestaurantIcon />}
                        // loading={isOrder}
                        loadingPosition="end"
                        disabled={isSubmitting || refund < 0}
                    >
                        New Table
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        // onClick={()=>{createInvoice(true)}}
                        endIcon={ loading ? <CircularProgress size={18} /> : <PrintIcon />}
                        // loading={isOrder}
                        loadingPosition="end"
                        disabled={isSubmitting || refund < 0}
                    >
                        Print
                    </Button>
                </Grid>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
}