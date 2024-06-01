import { Grid, InputLabel, OutlinedInput, Stack, Paper } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { packageService } from "../packageService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { packagePayload } from "../packagePayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';

export const PackageUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(packagePayload.update);
  const { packageData } = useSelector(state => state.package);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitPackage = async () => {
    setLoading(true);
    const formData = formBuilder(payload, packagePayload.update);
    const response = await packageService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.package);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await packageService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (packageData) {
      const updatePayload = { ...packageData }
      updatePayload.file_path = null;
      setPayload(updatePayload);
    }
  }, [packageData])

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
                <InputLabel > Name </InputLabel>
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
                        value={payload.hour ? payload.hour : ""}
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
                <InputLabel >Price </InputLabel>
                <OutlinedInput
                  type="number"
                  value={payload.price ? payload.price : ""}
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
              submit="Update"
              submitClick={submitPackage}
              loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
