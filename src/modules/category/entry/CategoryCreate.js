import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from "@mui/material";
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { categoryService } from "../categoryService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import { categoryPayload } from "../categoryPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Profile } from "../../../shares/Profile";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";

export const CategoryCreate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(categoryPayload.store);
    const [shops, setShops] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitGenre = async () => {
        setLoading(true);
        const formData = formBuilder(payload, categoryPayload.store);
        const create = await categoryService.store(formData, dispatch);
        if(create.status == 200){
            navigate(paths.category);
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
                                    placeholder="Enter Category Name"
                                />
                                <ValidationMessage field={"name"} />
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
                            cancelClick={() => navigate(paths.category)}
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
