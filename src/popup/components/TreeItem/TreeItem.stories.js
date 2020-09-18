import React from "react";

import Item from "./TreeItem";
import { v4 as uuid } from "uuid";

export default {
  title: "Tree",
  component: Item,
};

const Template = (args) => <Item {...args} />;

export const Story = Template.bind({});
const tree = {
  id: uuid(),
  name: "workplace",
  subNodes: [
    {
      id: uuid(),
      name: "google.com",
      subNodes: [
        {
          id: uuid(),
          name: "?test=test",
        },
        {
          id: uuid(),
          name: "?abc=def",
          isSelected: true,
        },
        {
          id: uuid(),
          name: "lorem=ipsum",
        },
      ],
    },
    {
      id: uuid(),
      name: "example.com",
      subNodes: [{ name: "http://example.com" }],
    },
    {
      id: uuid(),
      name: "yandex.ru",
      subNodes: [
        {
          id: uuid(),
          name: "ibm.com",
          subNodes: [
            {
              id: uuid(),
              name: "goodgame.ru",
            },
            {
              id: uuid(),
              name: "twitch.tv",
            },
            {
              id: uuid(),
              name: "youtube.com",
            },
          ],
        },
      ],
    },
  ],
};
Story.args = tree;
