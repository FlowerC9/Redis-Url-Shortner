import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import { UrlData } from '../../interface/UrlData';
import { serverUrl } from '../../helpers/constants';
import axios from 'axios';
import DataTable from '../DataTable/DataTable';



const Container: React.FunctionComponent = () => {
  const [data,setData]=React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);

  const updateReloadState=():void=>{
    setReload(true);
  }
  const fetchTableData=async ()=>{
    const response = await axios.get(`${serverUrl}/shortUrl`);
    setData(response.data);
    setReload(false);
  }
  React.useEffect(()=>{
    fetchTableData();
  },[reload])
  return (
    <div>
      <FormContainer updateReloadState={updateReloadState} />
      <DataTable data={data} updateReloadState={updateReloadState} />
    </div>
  );
};

export default Container;
