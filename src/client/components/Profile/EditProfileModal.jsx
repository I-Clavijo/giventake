import { Label, TextInput, Textarea, Button, Modal, Select, FileInput } from "flowbite-react";
import { useState } from "react";
import styles from './EditProfileModal.module.scss';
import { useUser } from "../../api/users/useUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserUpdate from "../../api/users/useUserUpdate";


export function EditProfileModal({ show, onClose }) {
  const { data: user } = useUser();
  const { mutateAsync: updateProfile, isSuccess, isPending } = useUserUpdate();

  const editProfileSchema = z
    .object({
      firstName: z.string().trim().min(2).max(30),
      lastName: z.string().trim().min(2).max(30),
      img: z.any().optional(),
      bio: z.string().optional(),
      // interests: z.string().array(),
      country: z.string().trim().optional(),
      city: z.string().trim().optional(),
      address: z.string().trim().optional(),
    });

  const defaultValues = {
    ...user,
    country: user?.location?.country ?? '',
    city: user?.location?.city ?? '',
    address: user?.location?.address ?? '',
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(editProfileSchema), defaultValues });

  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState([]); // Array to store selected interests

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleInterestChange = (event) => {
    const isChecked = event.target.checked;
    const interest = event.target.value;

    if (isChecked) {
      setInterests([...interests, interest]);
    } else {
      setInterests(interests.filter((i) => i !== interest));
    }
  };

  const onSubmit = (data) => {
    updateProfile({data, closeModal: onClose});
  };

  return (
    <>
      <Modal size="xl" position="center" dismissible {...{ show, onClose }}>
        <Modal.Header>
          <div>Edit Profile</div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>

              <Label htmlFor="fname" value="First Name" className="mb-2 block" />
              <TextInput id="fname" type="text" className="mb-4 block" {...register('firstName')} color={errors.firstName ? 'failure' : 'gray'} helperText={errors.firstName ? errors.firstName.message : ''} />

              <Label htmlFor="lname" value="Last Name" className="mb-2 block" />
              <TextInput id="lname" type="text" className="mb-4 block" {...register('lastName')} color={errors.lastName ? 'failure' : 'gray'} helperText={errors.lastName ? errors.lastName.message : ''} />

              <div className="mb-4">
                <Label htmlFor="bio" value="Profile picture:" className="mb-2 block" />
                <div>
                  <div className="flex w-full items-center justify-center">
                    <Label htmlFor="dropzone-file" className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600" >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        {!watch('img')?.length ?
                          <>
                            <svg className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16" > <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /> </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </> :
                          <span className="font-semibold">File loaded</span>
                        }

                      </div>
                      <FileInput id="dropzone-file" className="hidden" accept="image/*" {...register('img')} />
                    </Label>
                  </div>
                </div>
              </div>

              <Label htmlFor="bio" value="Bio" className="mb-2 block" />
              <Textarea id="bio" placeholder="Write description here..." className="mb-4 block" {...register('bio')} rows={4} color={errors.bio ? 'failure' : 'gray'} helperText={errors.bio ? errors.bio.message : ''} />

              <Label value="Country" className="mb-2 block" />
              <Select id="country" label="Select your Country" className="mb-4 block" color='light' {...register('country')} helperText={errors.country ? errors.country.message : ''}>
                {/* TODO: generate countries dynamically */}
                <option value=''>Choose country</option>
                <option value='Israel'>Israel</option>
                <option value='Cyprus'>Cyprus</option>
                <option value='Egypt'>Egypt</option>
              </Select>

              <Label htmlFor="city" value="City" className="mb-2 block" />
              <TextInput id="city" type="text" className="mb-4 block" {...register('city')} color={errors.city ? 'failure' : 'gray'} helperText={errors.city ? errors.city.message : ''} />

              <Label htmlFor="address" value="Address" className="mb-2 block" />
              <TextInput id="address" type="text" className="mb-4 block" {...register('address')} color={errors.address ? 'failure' : 'gray'} helperText={errors.address ? errors.address.message : ''} />

            <div className={styles.formActions}>
              <Button type='submit' className="button" disabled={isPending}>Save changes</Button>
              <Button color="light" onClick={onClose}>Dismiss</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

    </>
  );
}
