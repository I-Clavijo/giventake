import { Label, Modal, Textarea, Select, Button } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostAction } from '../../api/posts/usePostAction';
import styles from "./ReportModal.module.scss";

// I am just a lazy person and need to get this data from server.
export const REPORTS_REASONS = {
    SPAM: 'Spam',
    INAPPROPRIATE_CONTENT: 'Inappropriate content',
    OFFENSIVE_LANGUAGE: 'Offensive language',
    COPYRIGHT_VIOLATION: 'Copyright violation',
    FALSE_INFORMATION: 'False information',
    PERSONAL_ATTACK: 'Personal attack',
    OTHER: 'Other reason (please specify)'
  };
  
  const ReportModal = ({ show, onClose, postId, isUserReported }) => {
    const { mutate: postAction } = usePostAction();
  
    const reportSchema = z
      .object({
        reason: z.string(),
        description: z.string().optional(),
      })
      .refine(({ reason, description }) => reason !== 'OTHER' || (reason === 'OTHER' && description.length > 0), {
        path: ['description'],
        message: 'Please elaborate your reason...'
      });
  
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(reportSchema) });
  
    const reportHandler = (data) => {
      postAction({
        postId, actions: {
          isUserReported: !isUserReported,
          report: { key: data.reason, description: data.description }
        }
      });
  
      onClose();
    };
  
    return <>
      <Modal dismissible show={show} onClose={onClose}>
        <div className={styles.reportModalWrap}>
          <h4>Report post</h4>
  
          <form onSubmit={handleSubmit(reportHandler)}>
            <Label value='Specify reason:' />
            <Select className='mb-4' {...register('reason')}>
              {Object.entries(REPORTS_REASONS).map((item) => <option key={item[0]} value={item[0]}>{item[1]}</option>)}
            </Select>
  
            <Label value='Please elaborate on your complaint:' />
            <Textarea rows={4} className='mb-4' {...register('description')} />
            <Button type='submit' className='button'>Send report</Button>
          </form>
        </div>
      </Modal>
    </>;
  };

  export default ReportModal;