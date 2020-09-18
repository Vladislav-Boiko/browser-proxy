import React, { useState } from "react";
import TreeItem from "../TreeItem/TreeItem";

const Navigation = ({ className }) => {
  const [domain, setDomain] = useState("");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    setDomain(url.hostname);
  });
  return (
    <nav className={className}>
      <TreeItem
        id="a"
        name={domain}
        isSelected={true}
        subNodes={[
          {
            name: "overrides",
            id: "b",
            subNodes: [
              {
                name: "/de/Ajax/Search",
                id: "c",
              },
              {
                name: "/en/Ajax/Search",
                id: "d",
              },
              {
                name: "/ru/Ajax/Search",
                id: "e",
              },
            ],
          },
        ]}
      />
    </nav>
  );
};

export default Navigation;
