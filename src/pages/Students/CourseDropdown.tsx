import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

interface CourseDropdownProps {
  selectedCourses: string[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<string[]>>;
  courseItems: { label: string; value: string }[];
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownOpen: boolean;
}

const CourseDropdown: React.FC<CourseDropdownProps> = ({
  selectedCourses,
  setSelectedCourses,
  courseItems,
  setDropdownOpen,
  dropdownOpen,
}) => {
  return (
    <DropDownPicker
      open={dropdownOpen}
      value={selectedCourses}
      items={courseItems}
      setOpen={setDropdownOpen}
      setValue={setSelectedCourses}
      multiple={true}
      placeholder="Select Courses"
      mode="BADGE"
      badgeColors="#fff"
      badgeDotColors="white"
      min={0}
      max={5}
      style={{
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 10,
      }}
      dropDownContainerStyle={{
        backgroundColor: '#fff',
        borderColor: '#ccc',
      }}
      textStyle={{
        fontSize: 16,
        color: '#0c7de4',
        fontFamily: 'MochiyPop',
      }}
      labelStyle={{
        fontSize: 16,
        color: '#000',
        fontFamily: 'MochiyPop',
      }}
      placeholderStyle={{
        color: '#000',
        fontFamily: 'MochiyPop',
      }}
    />
  );
};

export default CourseDropdown;
