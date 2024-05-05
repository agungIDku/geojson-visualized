import { valid as isValidGeoJSON } from "geojson-validation";
import { toast } from "react-toastify";

import { jsonReader } from "@/app/utils/json";
import { useGeoStore } from "@/app/store/geo";

function useUpload() {
  const { setData } = useGeoStore();

  const handleChoosenFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event?.target?.files?.[0];
    if (selectedFile) {
      jsonReader(selectedFile, (res) => {
        if (isValidGeoJSON(res)) {
          setData(res);
        } else {
          toast.error("Invalid GeoJSON file");
        }
      });
    }
  };

  return { handleChoosenFile };
}

export default useUpload;
