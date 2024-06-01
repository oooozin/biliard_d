import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from "@mui/material";
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cashierService } from "../cashierService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import { cashierPayload } from "../cashierPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Profile } from "../../../shares/Profile";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";

export const CashierCreate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(cashierPayload.store);
    const [shops, setShops] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitGenre = async () => {
        setLoading(true);
        const formData = formBuilder(payload, cashierPayload.store);
        const create = await cashierService.store(formData, dispatch);
        if(create.status == 200){
            navigate(paths.cashier);
        }
        setLoading(false);
    };

    const loadingData = useCallback(async () => {
        setLoading(true);
        const shopResult = await getRequest(`${endpoints.shop}`);
        if (shopResult.status === 200) {
          setShops(shopResult.data);
        }
        setLoading(false);
    }, []);
    
    useEffect(() => {
        loadingData();
    }, [loadingData]);

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
                                value={payload.shop_id}
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
                            submit="Create"
                            submitClick={submitGenre}
                            loading={loading}
                        />
                    </Grid>
                </Paper>
            </div>
        </>
    );
};
