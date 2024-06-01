import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from "@mui/material";
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { itemDataService } from "../itemDataService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import { itemDataPayload } from "../itemDataPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { ProfileImage } from "../../../shares/ProfileImage";

export const ItemDataCreate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(itemDataPayload.store);
    const [items, setItems] = useState([]);
    const [shops, setShops] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitGenre = async () => {
        setLoading(true);
        const formData = formBuilder(payload, itemDataPayload.store);
        const create = await itemDataService.store(formData, dispatch);
        if(create.status == 200){
            navigate(paths.itemData);
        }
        setLoading(false);
    };

    const loadingData = useCallback(async () => {
        setLoading(true);
        const itemResult = await getRequest(`${endpoints.item}`);
        if (itemResult.status === 200) {
          setItems(itemResult.data);
        }
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
                                    return (
                                    <MenuItem key={`shop_id${index}`} value={value.id}> {value.name} </MenuItem>
                                    )
                                })}
                                </Select>
                                <ValidationMessage field={"shop_id"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel > Choose Item (required) </InputLabel>
                                <Select
                                id="item_id"
                                value={payload.category_id}
                                onChange={(e) =>
                                    payloadHandler(
                                    payload,
                                    e.target.value,
                                    "item_id",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                    )}
                                name="item_id"
                                >
                                { items.map((value, index) => {
                                    return (
                                    <MenuItem key={`item_id${index}`} value={value.id}> {value.name} </MenuItem>
                                    )
                                })}
                                </Select>
                                <ValidationMessage field={"item_id"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Qty (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    onChange={(e) => {
                                        const enteredValue = parseInt(e.target.value, 10); // Parse the input value as an integer
                                        if (enteredValue < 1) {
                                            payloadHandler(
                                                payload,
                                                1,
                                                "qty",
                                                (updateValue) => {
                                                    setPayload(updateValue);
                                                }
                                            );
                                        } else {
                                            payloadHandler(
                                                payload,
                                                enteredValue,
                                                "qty",
                                                (updateValue) => {
                                                    setPayload(updateValue);
                                                }
                                            );
                                        }
                                    }}
                                    value={payload.qty}
                                    name="qty"
                                    placeholder="Enter ItemData Qty"
                                />
                                <ValidationMessage field={"qty"} />
                            </Stack>
                        </Grid>

                        <FormMainAction
                            cancel="Cancle"
                            cancelClick={() => navigate(paths.itemData)}
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
