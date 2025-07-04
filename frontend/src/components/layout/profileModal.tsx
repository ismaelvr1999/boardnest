import { useForm } from "react-hook-form";
import type { User } from "../../features/auth/auth.types";
import type { SubmitHandler } from "react-hook-form";
import { uploadProfileImage } from "../../features/auth/auth.api";
import { UseAuth } from "../../features/auth/context/authContext";
import buildURL from "../../utils/buildURL";
import { toast } from "react-toastify";
const ProfileModal = ({ user }: { user: User }) => {
    const { setUser } = UseAuth();
    const { register, handleSubmit } = useForm<{ image: FileList }>();
    const onSubmit: SubmitHandler<{ image: FileList }> = async (d) => {
        const formData = new FormData();
        formData.append('profile_picture', d.image[0]);
        try {
            const resp = await uploadProfileImage(formData);
            setUser({
                ...resp.data.profile,
                picture: resp.data.profile.picture ?
                    buildURL(resp.data.profile.picture) :
                    buildURL("profile-pictures/default.png")
            });
            toast.success("Picture upload");

        } catch (error) {
            toast.error((error as Error).message);
        }
    }
    return (
        <>
            <h1 className="text-3xl font-bold mb-3 text-center">Profile</h1>
            <div className="flex gap-4 ">
                <div className="w-1/2 p-4 flex flex-col items-center justify-center">
                    <img src={user?.picture} alt="profile-picture" className="w-70 h-70 rounded-full border-2 cursor-pointer border-white object-cover" />
                    <p className="my-2 text-xl">Upload picture</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                        <input {...register("image")} className="w-2/3 block border border-white text-sm p-3 rounded-lg" type="file" id="profile-picture" accept="image/png, image/jpeg" required />
                        <button className="w-1/3 bg-green-700 hover:bg-green-600 rounded-lg">Upload</button>
                    </form>
                </div>
                <div className="w-1/2">
                    <p className="text-xl">Username</p>
                    <input type="text" defaultValue={user?.username} className="block border border-white w-full  text-sm p-3 rounded-lg my-2" readOnly></input>
                    <p className="text-xl">First Name</p>
                    <input type="text" defaultValue={user?.firstName} className="block border border-white w-full  text-sm p-3 rounded-lg my-2" readOnly></input>
                    <p className="text-xl">Last Name</p>
                    <input type="text" defaultValue={user?.lastName} className="block border border-white w-full  text-sm p-3 rounded-lg my-2" readOnly></input>
                    <p className="text-xl">Email</p>
                    <input type="text" defaultValue={user?.email} className="block border border-white w-full  text-sm p-3 rounded-lg my-2" readOnly></input>
                </div>
            </div>
            
        </>
    );
}

export default ProfileModal;