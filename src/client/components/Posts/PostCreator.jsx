import styles from "./PostCreator.module.scss";
import { Textarea, Button, Datepicker, FileInput, Label, TextInput } from "flowbite-react";
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

  return (
    <div className={styles.postCreator}>
      <header className={styles.header}>
        <h2 className={styles.title}>Create new post</h2>
      </header>

      <section className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(createPost)}>

          <div className="mb-4">
            <label className={styles.label} htmlFor="category">Choose category:</label>
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
            <div className="flex mb-4">  <label className={styles.label}>Date:</label>
              <span className={styles.startDate}>
                <Datepicker value={dateValue?.toDateString()} onSelectedDateChanged={(value) => setValue('date', value)} showClearButton={false} showTodayButton={false} id="date" minDate={new Date()} {...register('date')} />
              </span>

              {!isAllDay && (
                <>
                  <label className={styles.label}>From:</label>
                  <span className={styles.startTime}>
                    <TextInput placeholder='Start time (24h)' {...register('startTime')} />
                  </span>
                </>
              )}

              {!isAllDay && !isMultipleDay && (
                <>
                  <label className={styles.label}>To:</label>
                  <span className={styles.endTime}>
                    <TextInput placeholder='End time (24h)' {...register('endTime')} />
                  </span>
                </>
              )}
            </div>

            <div className="mb-4 flex items-center">  <label>
              <input type="checkbox" checked={isAllDay} onChange={(e) => setIsAllDay(e.target.checked)} />
              All day
            </label>

              <label className="ml-4">  <input type="checkbox" checked={isMultipleDay} onChange={(e) => setIsMultipleDay(e.target.checked)} />
                Multiple days  
              </label>
            </div>

            {isMultipleDay && (
              <div className="mb-4">
                <label className={styles.label}>End date:</label>
                <span className={styles.endDate}>
                  <Datepicker value={watch('endDate').toDateString()} showClearButton={false} showTodayButton={false} onSelectedDateChanged={(value) => setValue('endDate', value)} id="endDate" minDate={watch('startDate')} {...register('endDate')} />
                </span>
                <label className={styles.label}>To:</label>
                  <span className={styles.endTime}>
                    <TextInput placeholder='End time (24h)' {...register('endTime')} />
                  </span>
              </div>
            )}
          </div>




          <div className={styles.voluPlace}>
            <label className={styles.label} htmlFor="city">Location:</label>
            {!isRemote && (
              <div>  {/* Wrap the following elements */}
                <span>
                  <TextInput placeholder='Address' {...register('address')} />
                </span>
                <span>
                  <TextInput placeholder='City' {...register('city')} />
                </span>
              </div>
            )}
            <label>
              <input type="checkbox" checked={isRemote} onChange={(e) => setRemote(e.target.checked)} />
              Remote Help
            </label>
          </div>

          <div className="mb-4">
            <label className={styles.label}>Picture of your post:</label>
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
            <label className={styles.label} htmlFor="description"> Description: </label>
            <div className="mb-2 block"> <Label htmlFor="description" /> </div>
            <Textarea id="description" placeholder="Write here" rows={5} {...register('description')} />
          </div>

          <div className={styles.submitButton}>
            <Button type='submit' disabled={isSubmitting} className='button'>Create post</Button>
          </div>
        </form>
      </section>
    </div>

  );
};

export default PostCreator;