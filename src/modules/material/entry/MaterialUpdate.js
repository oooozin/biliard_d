import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { materialService } from "../materialService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { materialPayload } from "../materialPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Profile } from '../../../shares/Profile';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { ProfileImage } from '../../../shares/ProfileImage';

export const MaterialUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(materialPayload.update);
  const { material } = useSelector(state => state.material);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitMaterial = async () => {
    setLoading(true);
    const formData = formBuilder(payload, materialPayload.update);
    const response = await materialService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.material);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await materialService.show(dispatch, params.id);

    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (material) {
      const updatePayload = { ...material }
      setPayload(updatePayload);
    }
  }, [material])

  return (
    <>
      <div className=" grid">
        <div className="col-12">
          <Breadcrumb />
        </div>

        <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Stack
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ProfileImage
                            preview={payload.image ? payload.image : null}
                            onSelect={(e) => payloadHandler(payload, e, 'image', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"image"} />
                    </Stack>
                </Grid>

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
                            placeholder="Enter Material Name"
                        />
                        <ValidationMessage field={"name"} />
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
                    cancelClick={() => navigate(paths.material)}
                    submit="Update"
                    submitClick={submitMaterial}
                    loading={loading}
                />
            </Grid>
        </Paper>
      </div>
    </>
  );
};
