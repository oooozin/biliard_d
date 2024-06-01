import { Grid, InputLabel, OutlinedInput, Stack, Paper } from "@mui/material";
import { paths } from "../../../constants/paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { packageService } from "../packageService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import { packagePayload } from "../packagePayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export const PackageCreate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(packagePayload.store);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitGenre = async () => {
        setLoading(true);
        const formData = formBuilder(payload, packagePayload.store);
        const create = await packageService.store(formData, dispatch);
        if(create.status == 200){
            navigate(paths.package);
        }
        setLoading(false);
    };

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
                                    placeholder="Enter Package Name"
                                />
                                <ValidationMessage field={"name"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Hour (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="text"
                                    onChange={(e) => {
                                      const timeValue = e.target.value;
                                      const [hours, minutes] = timeValue.split(":");
                                      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                                        payloadHandler(
                                          payload,
                                          timeValue,
                                          "hour",
                                          (updateValue) => {
                                            setPayload(updateValue);
                                          }
                                        );
                                      }
                                    }}
                                    name="hour"
                                    placeholder="Enter Time (hh:mm)"
                                />
                                <ValidationMessage field={"hour"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Price (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "price",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="price"
                                    placeholder="Enter Package Price"
                                />
                                <ValidationMessage field={"price"} />
                            </Stack>
                        </Grid>

                        <FormMainAction
                            cancel="Cancle"
                            cancelClick={() => navigate(paths.package)}
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
