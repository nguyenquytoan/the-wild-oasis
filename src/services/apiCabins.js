import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export const getCabinsApi = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

const preprocessImage = (name) => {
  const imageName = `${uuidv4()}-${name.replaceAll("/", "")}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  return {
    imageName,
    imagePath,
  };
};

const uploadImageToSupabase = async (imageName, image) => {
  const { error: uploadedImageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, image, {
      cacheControl: "3600",
      upsert: false,
    });

  return uploadedImageError;
};

export const createCabinApi = async (newCabin) => {
  // Step 1: Create image name & path
  const { imageName, imagePath } = preprocessImage(newCabin.image_url.name);

  // Step 2: Create new cabin with image url
  const { data: newCreatedCabin, error: createdCabinError } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image_url: imagePath }])
    .select()
    .single();

  if (createdCabinError) {
    console.error(createdCabinError);
    throw new Error("Cabin could not be created");
  }

  // Step 3: Upload image to supabase
  const uploadedImageError = await uploadImageToSupabase(
    imageName,
    newCabin.image_url
  );

  // Step 4: Rollback if cannot upload image
  if (uploadedImageError) {
    await deleteCabinApi(newCreatedCabin.id);
    console.error(uploadedImageError);
    throw new Error("Cabin image could not be uploaded");
  }
};

export const editCabinApi = async (cabin, cabinId, oldImageUrl) => {
  // Step 1: Create image name & path if any
  const isUploadNewImage = typeof cabin.image_url !== "string";
  let imageName = "",
    imagePath = isUploadNewImage ? "" : cabin.image_url;

  if (isUploadNewImage) {
    const imageInfo = preprocessImage(cabin.image_url.name);
    imageName = imageInfo.imageName;
    imagePath = imageInfo.imagePath;
  }

  // Step 2: Edit cabin info
  const { error: edittedCabinError } = await supabase
    .from("cabins")
    .update({ ...cabin, image_url: imagePath })
    .eq("id", cabinId)
    .select()
    .single();

  if (edittedCabinError) {
    console.error(edittedCabinError);
    throw new Error("Cabin could not be editted");
  }

  // Step 3: Upload image to supabase if any
  if (!isUploadNewImage) {
    return;
  }

  const uploadedImageError = await uploadImageToSupabase(
    imageName,
    cabin.image_url
  );

  if (uploadedImageError) {
    await supabase
      .from("cabins")
      .update({ ...cabin, image_url: oldImageUrl })
      .eq("id", cabinId)
      .select()
      .single();
    console.error(uploadedImageError);
    throw new Error("Cabin image could not be uploaded");
  }
};

export const deleteCabinApi = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
};
