import { ServiceBase } from "./ServiceBase";
import { Locations } from "../constants";

export interface FilesReponseProps {
  name: string;
  link: string;
  fullLink: string;
}

export default class FilestorageService extends ServiceBase {
  protected static BASE_URL = `${Locations.fileStorage}/api/v1/files`;

  protected static downloadOptions = {
    responseType: "blob" as const,
  };

  public static fetchBuckets() {
    return this.get<FilesReponseProps>(`/buckets`);
  }

  public static uploadFile(
    formData: FormData,
    bucket: string,
    shared?: boolean
  ) {
    return this.post<FilesReponseProps>(
      `/upload/${bucket}/${shared ? "true" : "false"}`,
      formData
    );
  }

  public static downloadFile(url: string) {
    return this.get<Blob>(`/${url}`, {}, { ...this.downloadOptions });
  }
}
