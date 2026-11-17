import { NextResponse } from "next/server";

import { deleteImageFromS3 } from "@/lib/s3utils";
import { uploadFileToS3 } from "@/lib/s3utils";
import { currentPermissions, currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    const { hasPermission } = await currentPermissions();
    const canUpload = hasPermission("image:upload");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canUpload)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const previousImageUrl = formData.get("previousImageUrl") as string | null;
    const productId = formData.get("productId") as string | null;
    const nutritionCoachId = formData.get("nutritionCoachId") as string | null;
    const successStorycategoryId = formData.get("successStorycategoryId") as
      | string
      | null;
    const categoryId = formData.get("categoryId") as string | null;
    const ingredientId = formData.get("ingredientId") as string | null;
    const postId = formData.get("postId") as string | null;
    const postCategoryId = formData.get("postCategoryId") as string | null;
    const isGallery = formData.get("isGallery") as boolean | null;
    const imageType = formData.get("imageType") as string | null;

    const filesMap: Record<string, File[]> = {};
    formData.forEach((value: File | string | Blob, key: string) => {
      if (value instanceof File) {
        if (!filesMap[key]) {
          filesMap[key] = [];
        }
        filesMap[key].push(value);
      }
    });

    if (previousImageUrl) {
      // delete previous image
      const key = previousImageUrl.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION
        }.amazonaws.com/`,
      )[1];

      await deleteImageFromS3(key);
    }
    let uploadedImageUrls: string[] | null = [];
    for (let fileName in filesMap) {
      if (Object.prototype.hasOwnProperty.call(filesMap, fileName)) {
        const files = filesMap[fileName];
        for (let file of files) {
          const fileContent = Buffer.from(await file.arrayBuffer());
          // upload image

          if (imageType === "postImage") {
            const fileName = `postImages/${file.name}`; // Replace with your desired filename
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName,
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          } else if (categoryId) {
            const fileName = `categories/${categoryId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName,
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          } else if (ingredientId) {
            const fileName = `ingredients/${ingredientId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName,
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          } else if (postCategoryId) {
            const fileName = `articles/categories/${postCategoryId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName,
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          } else if (nutritionCoachId) {
            const fileName = `teams/${nutritionCoachId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName,
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          } else if (successStorycategoryId) {
            const fileName = `success-stories/${successStorycategoryId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName,
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          } else if (postId) {
            const fileName = `articles/${postId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName,
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          } else {
            const fileName = isGallery
              ? `products/${productId}/gallery/${file.name}`
              : `products/${productId}/${file.name}`;
            const uploadedData = await uploadFileToS3(
              fileContent as Buffer,
              file.type,
              fileName,
            );
            if (uploadedData) {
              const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
              uploadedImageUrls.push(imageUrl);
            }
          }
        }
      }
    }
    return NextResponse.json(uploadedImageUrls, { status: 200 });
  } catch (error) {
    console.log("[S3Upload]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
