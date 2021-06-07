import React from "react";
import { Card } from "antd";

export default function CustomCard({ url, title, id }) {
  return (
    <Card
      hoverable
      style={{ width: 600, height: 400 }}
      cover={<img alt={title} src={url} className="card-img" />}
      className="img-card"
    ></Card>
  );
}
