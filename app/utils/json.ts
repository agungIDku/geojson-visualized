import { toast } from "react-toastify";

function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const jsonReader = async (file: File, callback: (data: any) => void) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (event?.target?.result) {
      if (isJsonString(event.target.result as string)) {
        const geoJSONData = JSON.parse(event.target.result as string);
        callback(geoJSONData);
      } else {
        toast.error("JSON file not valid");
        return;
      }
    } else {
      toast.error("An error occurred during upload");
      return;
    }
  };
  reader.readAsText(file);
};

export { isJsonString, jsonReader };
