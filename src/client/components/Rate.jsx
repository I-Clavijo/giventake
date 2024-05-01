import { Button, Checkbox, Label, Modal, TextInput, Dropdown } from "flowbite-react";
import {  useRef,useState } from "react";

export function Component() {
  const [openModal, setOpenModal] = useState(true);
  const emailInputRef = useRef(null); 

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Review latest Activity</Button>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Tell us a bit how was it</h3>
            <Dropdown label="Choose who helped you" dismissOnClick={false}>
                {/*insert possible users who volentired*/}
                <Dropdown.Item>Yossi</Dropdown.Item>
                <Dropdown.Item>David</Dropdown.Item>
                <Dropdown.Item>Michael</Dropdown.Item>
                <Dropdown.Item>Boris</Dropdown.Item>
            </Dropdown>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your experince" />
              </div>
              <TextInput id="reviewText"  placeholder="write a short summery" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Rate" value="Rate the experience" />
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="w-full">
              <Button>Submit your review</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
