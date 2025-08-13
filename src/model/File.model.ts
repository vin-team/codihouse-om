export interface File {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  folder: string;
  uploaded_by: string;
  created_on: string;
  modified_by: string;
  modified_on: string;
  charset: string;
  filesize: string;
  width: string;
  height: string;
  duration: string;
  embed: string;
  description: string;
  location: string;
  tags: string;
  metadata: string;
  focal_point_x: string;
  focal_point_y: string;
  tus_id: string;
  tus_data: string;
  uploaded_on: string;
}

export const parseFile = (file: any): File => {
  return {
    id: file.id,
    storage: file.storage,
    filename_disk: file.filename_disk,
    filename_download: file.filename_download,
    title: file.title,
    type: file.type,
    folder: file.folder,
    uploaded_by: file.uploaded_by,
    created_on: file.created_on,
    modified_by: file.modified_by,
    modified_on: file.modified_on,
    charset: file.charset,
    filesize: file.filesize,
    width: file.width,
    height: file.height,
    duration: file.duration,
    embed: file.embed,
    description: file.description,
    location: file.location,
    tags: file.tags,
    metadata: file.metadata,
    focal_point_x: file.focal_point_x,
    focal_point_y: file.focal_point_y,
    tus_id: file.tus_id,
    tus_data: file.tus_data,
    uploaded_on: file.uploaded_on,
  };
};

export const parseFiles = (files: any[]): File[] => {
  if (!Array.isArray(files)) return [];
  return files.map(parseFile);
};