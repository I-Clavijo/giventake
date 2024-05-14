import { Body, Button, Column, Container, Head, Heading, Html, Img, Link, Preview, Row, Section, Text, Tailwind } from "@react-email/components";
import { space } from "postcss/lib/list";
import React from "react";


/*const baseUrl = process.env.VITE_BASE_URL?
    `https://${process.env.GIVENTAKE_URL}`
    : "";
const baseUrl = process.env.GIVENTAKE_URL
  ? `https://${process.env.GIVENTAKE_URL}`
  : "";*/

const baseUrl = "https://giventake.org";

const GiventakeWelcomeEmail = ({name}) => {

  return (
    <Html>
      <Head />
      <Preview>Given'take Welcome</Preview>
        <Body style={main}>
            <section style={header}>
                <Img
                    src="https://onedrive.live.com/embed?resid=B8BC9B049BB1AE95%215590&authkey=%21AFj_phHaUAj2iTc&width=846&height=196"
                    alt="given'take logo"
                    style={imgHeader}
                />  
            </section>
            <Container style={container}>
                <Heading style={title}>
                    <h2>Hi {name},</h2>
                    <h2>Welcome to given'take </h2>
                </Heading>
                <Section> 
                    <Text style= {bodyText}>
                        <strong>Explore our community built on the principles of mutual aid,
                             where giving and receiving help is at the heart of everything we do.
                              Help us create a space where kindness thrives and support is freely given,
                               making a positive impact in each other's lives</strong>
                    </Text>
                </Section>
                <Section>
                    <Button>
                        <Link style={button} href={`${baseUrl}`}>Get Started</Link>
                    </Button>
                </Section>
                <Section style={footer}>
                    <Text style= {footerText}>
                        <strong>
                            Best,
                            <br />
                            given'take team
                        </strong>
                    </Text>
                </Section>
                <section >
                    <Img
                        src="https://onedrive.live.com/embed?resid=B8BC9B049BB1AE95%215591&authkey=%21AHOpi78OvmJEL3g&width=1037&height=691"
                        alt="given'take logo"
                        style={imgBody}
                    />  
                    <Text><strong>"Only a life lived for others is a life worthwhile."
                        Albert Einstein</strong></Text>
                </section>
            </Container>
        </Body>

    </Html>
  );
};

GiventakeWelcomeEmail.PreviewProps = {
    userName: "",
  }

export default GiventakeWelcomeEmail;


const main = {
    fontFamily: '"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    backgroundColor: "#fff",
    margin: "0",
    padding: "10px",
  };
  
  const imgBody = {
    margin: "auto",
    maxWidth: "100%",
    width: "640px",
  };

  const imgHeader = {
    margin: "auto",
    maxWidth: "100%",
    width: "640px",
  };
  
  const header = {
    width: "100%",
    backgroundColor: "#fff",
    margin: "0 auto",
    zIndex: "999",
  };
  
  const container = {
    margin: "0 auto",
    width: "648px",
    maxWidth: "100%",
    textAlign: "center",
  };

  const title = {
    fontSize: "30px",
    margin: "10px 0 0 0",
  }

  const footer = {
    textAlign: "left",
    
  };

  const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "20px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
  };
  
  const bodyText = { 
    fontSize: "20px",
    lineHeight: "1.5",
  }

  const footerText = {
    fontSize: "18px",
  }
