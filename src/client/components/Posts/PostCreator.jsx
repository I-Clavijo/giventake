import styles from "./PostCreator.module.scss";
import { Textarea, Button, Datepicker, FileInput, Label, TextInput, Checkbox, Card } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '../../api/posts/useCreatePost';
import { useEffect, useState } from "react";
import { element } from "prop-types";


const categories = [
  'Technology',
  'Travel',
  'Music',
  'Art',
  'Sports',
];


const PostCreator = () => {
  const { mutate: createPost } = useCreatePost();
  const [isAllDay, setIsAllDay] = useState(false);
  const [isRemote, setRemote] = useState(false);
  const [isMultipleDay, setIsMultipleDay] = useState(false);
  const createPostSchema = z
    .object({
      category: z.string().min(2),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      address: z.string().optional(),
      city: z.string().min(2),
      img: z.any().optional(),
      description: z.string().optional()
    });

  const formTestValues = {
    category: 'Travel',
    startTime: '12:00',
    endTime: '16:00',
    address: 'Even Gvirol, 22',
    city: 'Herzliya',
    description: 'Hello everybody, I need your help with traveling with me to Italy to hike in the mountains, and help me with my wheelchair.'
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    getValues // Add getValues function to get form values
  } = useForm({
    defaultValues: {
      startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: new Date(new Date().setHours(0, 0, 0, 0)),
      ...formTestValues
    },
    resolver: zodResolver(createPostSchema)
  });
  const dateValue = getValues('date');
  const endDateValue = getValues('endDate');

  return <div className={styles.postCreator}>
    <h4>Let's Start!</h4>
    <p>Ready to tap into the collective wisdom of our amazing community?<br /> Don't hesitate to create a new post if you find yourself in need of assistance.<br /> <i>Just as you've helped others, it's now your turn to ask for support.</i><br /> Together, we can overcome any challenge. Describe your situation, and let the magic of our community work its wonders! <br />  </p>

    <h3 className={styles.textBoldOut}>Together, we're unstoppable!</h3>

    <Card>
      <h4>Create new post</h4>
      <form onSubmit={handleSubmit(createPost)}>
        <div className="mb-2 mt-4">
          <Label className={styles.label} htmlFor="category">Choose an appropriate category *</Label>
          <select {...register('category')} id="category" className="form-select px- py-1.7 w-full rounded-md">
            <option value="">Category</option>
            {categories.map((Category) => (
              <option key={Category} value={Category}>
                {Category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.helpDates}>
          <Label className={styles.label}>When do you need your help?</Label>
          <div className="flex mb-2">
            <span>
              <Datepicker value={watch('startDate').toDateString()} onSelectedDateChanged={(value) => { setValue('startDate', value); setValue('endDate', value) }} showClearButton={false} showTodayButton={false} id="startDate" minDate={new Date()} {...register('startDate')} />
            </span>

            {!isAllDay && (
              <span className={styles.startTime}>
                <TextInput placeholder='Start time (24h)' {...register('startTime')} maxLength={5} />
              </span>
            )}

            {!isAllDay && isMultipleDay && (
              <>
                <label className={styles.label}>to</label>
                <span className={styles.endTime}>
                  <TextInput placeholder='End time (24h)' {...register('endTime')} maxLength={5} />
                </span>
              </>
            )}
            {isMultipleDay && (
              <span>
                <Datepicker value={watch('endDate').toDateString()} showClearButton={false} showTodayButton={false} onSelectedDateChanged={(value) => setValue('endDate', value)} id="endDate" minDate={watch('startDate')} {...register('endDate')} />
              </span>
            )}
          </div>

          <div className="flex">
            <div className="flex gap-2 items-center">
              <Checkbox id="allDay" checked={isAllDay} onChange={(e) => setIsAllDay(e.target.checked)} />
              <Label htmlFor="allDay">All day</Label>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox id="multipleDays" checked={isMultipleDay} onChange={(e) => setIsMultipleDay(e.target.checked)} />
              <Label htmlFor="multipleDays">Multiple days</Label>
            </div>
          </div>
        </div>


        <div className="mb-2">
          <div className="flex gap-2 mb-2">
            <Label className={styles.label} htmlFor="city">Where do you need your help? </Label>
            <div className={styles.remoteHelp}>
              <Checkbox id="remoteHelp" checked={isRemote} onChange={(e) => setRemote(e.target.checked)} />
              <Label htmlFor="remoteHelp">Remote Help</Label>
            </div>
          </div>

          {!isRemote && (
            <div className="flex items-center gap-2">
              {/* <Label htmlFor="address">Address:</Label> */}
              <TextInput id="address" placeholder='Address' {...register('address')} />
              {/* <Label htmlFor="city">City:</Label> */}
              <TextInput id="city" placeholder='City' {...register('city')} />
            </div>

          )}
        </div>

        <div className="mb-4">
          <Label className={styles.label}>Picture of your post (optional)</Label>
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

        <div className="mb-4">
          <Label className={styles.label} htmlFor="description"> Description </Label>
          <div className="mb-2 block"> <Label htmlFor="description" /> </div>
          <Textarea id="description" placeholder="Write here" rows={5} {...register('description')} />
        </div>

        <div className={styles.submitButton}>
          <Button type='submit' disabled={isSubmitting} className='button'>Create post</Button>
        </div>
      </form>

    </Card>
  </div>
};

export default PostCreator;