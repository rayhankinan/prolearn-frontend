import React from "react";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";

type Props = {
  title: string;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
};



const Hero: React.FC<Props> = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto">
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => (
            <Link color="inherit" href={breadcrumb.href} key={index}>
              {breadcrumb.label}
            </Link>
          ))}
        </Breadcrumbs>
        <Typography variant="h3" component="h1" className="font-bold mt-2">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default Hero;
