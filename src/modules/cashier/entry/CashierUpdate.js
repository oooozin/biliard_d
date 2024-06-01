import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cashierService } from "../cashierService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { cashierPayload } from "../cashierPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Profile } from '../../../shares/Profile';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';

export const CashierUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(cashierPayload.update);
  const [shops, setShops] = useState([]);
  const { cashier } = useSelector(state => state.cashier);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitCashier = async () => {
    setLoading(true);
    const formData = formBuilder(payload, cashierPayload.update);
    const response = await cashierService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.cashier);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await cashierService.show(dispatch, params.id);

    const shopResult = await getRequest(`${endpoints.shop}`);
    if (shopResult.status === 200) {
      setShops(shopResult.data);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (cashier) {
      const updatePayload = { ...cashier }
      setPayload(updatePayload);
    }
  }, [cashier])

  return (
    <>
      <div className=" grid">
        <div className="col-12">
          <Breadcrumb />
        </div>

        <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Name (required)
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            value={payload.name ? payload.name : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "name",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="name"
                            placeholder="Enter Cashier Name"
                        />
                        <ValidationMessage field={"name"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Phone 
                        </InputLabel>
                        <OutlinedInput
                            type="number"
                            value={payload.phone ? payload.phone : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "phone",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="phone"
                            placeholder="Enter Cashier Phone"
                        />
                        <ValidationMessage field={"phone"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Address
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            value={payload.address ? payload.address : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "address",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="address"
                            placeholder="Enter Cashier Address"
                        />
                        <ValidationMessage field={"address"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel > Choose Shop (required) </InputLabel>
                        <Select
                        id="shop_id"
                        value={payload.shop_id ? payload.shop_id : ""}
                        onChange={(e) =>
                            payloadHandler(
                            payload,
                            e.target.value,
                            "shop_id",
                            (updateValue) => {
                                setPayload(updateValue);
                            }
                            )}
                        name="shop_id"
                        >
                        { shops.map((value, index) => {
                            if(!value.is_warehouse){
                                return (
                                    <MenuItem key={`shop_id${index}`} value={value.id}> {value.name} </MenuItem>
                                )
                            }                                
                        })}
                        </Select>
                        <ValidationMessage field={"shop_id"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >Status (required)</InputLabel>
                        <Select
                            id="status"
                            value={payload.status ? payload.status : ""}
                            onChange={(e) =>
                            payloadHandler(
                                payload,
                                e.target.value,
                                "status",
                                (updateValue) => {
                                setPayload(updateValue);
                                }
                            )}
                            name="status"
                        >
                            <MenuItem value="ACTIVE">Active</MenuItem>
                            <MenuItem value="INACTIVE">Inactive</MenuItem>
                        </Select>
                        <ValidationMessage field={"status"} />
                    </Stack>
                </Grid>

                <FormMainAction
                    cancel="Cancle"
                    cancelClick={() => navigate(paths.cashier)}
                    submit="Update"
                    submitClick={submitCashier}
                    loading={loading}
                />
            </Grid>
        </Paper>
      </div>
    </>
  );
};
