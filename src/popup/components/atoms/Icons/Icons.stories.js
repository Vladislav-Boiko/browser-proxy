import React from 'react';
import Icons from './Icons';

export default {
  title: 'Atoms/Icons',
  component: Icons,
};

const Template = () => (
  <div>
    <h4 className="my1">Small</h4>
    <Icons.Cross className="icon_sm ml1" />
    <Icons.Watch className="icon_sm ml1" />
    <Icons.Domain className="icon_sm ml1" />
    <Icons.Folder className="icon_sm ml1" />
    <Icons.Text className="icon_sm ml1" />
    <Icons.ArrayBuffer className="icon_sm ml1" />
    <Icons.File className="icon_sm ml1" />
    <Icons.Chevron className="icon_sm ml1" />
    <Icons.Enable className="icon_sm ml1" />
    <Icons.Filter className="icon_sm ml1" />
    <Icons.AddFile className="icon_sm ml1" />
    <Icons.AddFolder className="icon_sm ml1" />
    <Icons.Add className="icon_sm ml1" />
    <Icons.Import className="icon_sm ml1" />
    <Icons.Export className="icon_sm ml1" />
    <Icons.TurnOff className="icon_sm ml1" />
    <Icons.Trash className="icon_sm ml1" />
    <Icons.Danger className="icon_sm ml1" />
    <h4 className="my2">Medium</h4>
    <Icons.Cross className="icon_md ml1" />
    <Icons.Watch className="icon_md ml1" />
    <Icons.Domain className="icon_md ml1" />
    <Icons.Folder className="icon_md ml1" />
    <Icons.Text className="icon_md ml1" />
    <Icons.ArrayBuffer className="icon_md ml1" />
    <Icons.File className="icon_md ml1" />
    <Icons.Chevron className="icon_md ml1" />
    <Icons.Enable className="icon_md ml1" />
    <Icons.Filter className="icon_md ml1" />
    <Icons.AddFile className="icon_md ml1" />
    <Icons.AddFolder className="icon_md ml1" />
    <Icons.Add className="icon_md ml1" />
    <Icons.Import className="icon_md ml1" />
    <Icons.Export className="icon_md ml1" />
    <Icons.TurnOff className="icon_md ml1" />
    <Icons.Trash className="icon_md ml1" />
    <Icons.Danger className="icon_md ml1" />
    <h4 className="my2">Large</h4>
    <Icons.Cross className="icon_lg ml1" />
    <Icons.Watch className="icon_lg ml1" />
    <Icons.Domain className="icon_lg ml1" />
    <Icons.Folder className="icon_lg ml1" />
    <Icons.Text className="icon_lg ml1" />
    <Icons.ArrayBuffer className="icon_lg ml1" />
    <Icons.File className="icon_lg ml1" />
    <Icons.Chevron className="icon_lg ml1" />
    <Icons.Enable className="icon_lg ml1" />
    <Icons.Filter className="icon_lg ml1" />
    <Icons.AddFile className="icon_lg ml1" />
    <Icons.AddFolder className="icon_lg ml1" />
    <Icons.Add className="icon_lg ml1" />
    <Icons.Import className="icon_lg ml1" />
    <Icons.Export className="icon_lg ml1" />
    <Icons.TurnOff className="icon_lg ml1" />
    <Icons.Trash className="icon_lg ml1" />
    <Icons.Danger className="icon_lg ml1" />
  </div>
);

export const Story = Template.bind({});
const tree = {
  value: 'Connection',
  label: 'Search',
};
Story.args = tree;
