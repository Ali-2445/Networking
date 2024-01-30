import { calculateHeight, calculateWidth } from "@/theme/utils";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/theme";
import DropdownOutline from "@/theme/assets/svgs/DropdownOutline";

interface TableWithPaginationProps {
  data: any[];
  itemsPerPage?: number;
  columnTitles: string[];
  onRowSelectionChange: (selectedRows: number[]) => void;
  headerStyle?: any;
  rowDataStyle?: any;
  showSelectBox?: boolean;
  withPagination?: boolean;
  renderCustomHeader?: () => React.ReactNode;
  renderCustomRow?: (
    rowData: any,
    isSelected: boolean,
    onRowSelection: () => void
  ) => React.ReactNode;
}

const TableWithPagination: React.FC<TableWithPaginationProps> = ({
  data,
  itemsPerPage = 7,
  columnTitles,
  onRowSelectionChange,
  headerStyle,
  rowDataStyle,
  showSelectBox = true,
  withPagination = true,
  renderCustomHeader,
  renderCustomRow,
}) => {
  const { colors, backgrounds, fonts } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    onRowSelectionChange(selectedRows);
  }, [selectedRows, onRowSelectionChange]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectAllRows = () => {
    const allRowIds = data.map((row) => row.id);
    const allSelected = selectedRows.length === allRowIds.length;

    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allRowIds);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      const isCurrentPage = i === currentPage;

      buttons.push(
        <TouchableOpacity
          key={`page-button-${i}`}
          onPress={() => handlePageChange(i)}
          style={[
            styles.paginationButton,
            backgrounds.tableHead,
            isCurrentPage && { backgroundColor: colors.blue },
          ]}
        >
          <Text
            style={[
              fonts.size_10,
              fonts[400],
              fonts.typography,
              isCurrentPage && { color: colors.white },
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

  const renderTableHeader = () => {
    if (renderCustomHeader) {
      return renderCustomHeader();
    }
    return (
      <View style={[styles.tableHeader, backgrounds.tableHead]}>
        <View
          style={[
            {
              width: calculateWidth(48),
              alignItems: "center",
            },
          ]}
        >
          {showSelectBox && (
            <TouchableOpacity onPress={() => handleSelectAllRows()}>
              <View
                style={[
                  styles.selectBox,
                  {
                    backgroundColor:
                      selectedRows.length === data.length
                        ? colors.blue
                        : colors.white,
                    borderColor: colors.tableHead,
                  },
                ]}
              ></View>
            </TouchableOpacity>
          )}
        </View>
        {columnTitles.map((title, index) => (
          <View key={`header-${index}`} style={styles.headerCell}>
            <Text style={[fonts.size_13, fonts[600], fonts.typography]}>
              {title}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  //   const tableRows = [];

  //   for (let i = startIndex; i < endIndex; i++) {
  //     const isSelected = selectedRows.includes(data[i].id);
  //     const rowData = [];
  //     if (showSelectBox) {
  //       rowData.push(
  //         <TouchableOpacity
  //           key={`select-box-${data[i].id}`}
  //           onPress={() => handleRowSelection(data[i].id)}
  //           style={styles.box}
  //         >
  //           <View
  //             key={`select-box-${data[i].id}`}
  //             style={[
  //               styles.selectBox,
  //               {
  //                 backgroundColor: isSelected ? colors.blue : colors.white,
  //                 borderColor: colors.tableHead,
  //               },
  //             ]}
  //           ></View>
  //         </TouchableOpacity>
  //       );
  //     }

  //     Object.keys(data[i]).map((key, index) => {
  //       if (key != "id") {
  //         rowData.push(
  //           <View key={`cell-${i}-1`} style={[styles.cell]}>
  //             <Text style={[fonts.size_12, fonts[600], fonts.typography]}>
  //               {data[i][key]}
  //             </Text>
  //           </View>
  //         );
  //       }
  //     });

  //     tableRows.push(
  //       <View
  //         key={`row-${data[i].id}`}
  //         style={[
  //           styles.row,
  //           {
  //             backgroundColor: colors.white,
  //             borderLeftColor: colors.tableHead,
  //             borderRightColor: colors.tableHead,
  //             borderBottomColor: colors.tableHead,
  //           },
  //         ]}
  //       >
  //         {rowData}
  //       </View>
  //     );
  //   }

  //   return tableRows;
  // };

  const renderTable = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);

    const tableRows = [];

    for (let i = startIndex; i < endIndex; i++) {
      const isSelected = selectedRows.includes(data[i].id);
      const rowData = [];
      if (showSelectBox) {
        rowData.push(
          <TouchableOpacity
            key={`select-box-${data[i].id}`}
            onPress={() => handleRowSelection(data[i].id)}
            style={styles.box}
          >
            <View
              key={`select-box-${data[i].id}`}
              style={[
                styles.selectBox,
                {
                  backgroundColor: isSelected ? colors.blue : colors.white,
                  borderColor: colors.tableHead,
                },
              ]}
            ></View>
          </TouchableOpacity>
        );
      }

      Object.keys(data[i]).map((key, index) => {
        if (key !== "id") {
          console.log("H");
          if (renderCustomRow) {
            rowData.push(
              <>
                {renderCustomRow(data[i], isSelected, () =>
                  handleRowSelection(data[i].id)
                )}
              </>
            );
          } else {
            rowData.push(
              <View key={`cell-${i}-${index}`} style={[styles.cell]}>
                <Text style={[fonts.size_12, fonts[600], fonts.typography]}>
                  {data[i][key]}
                </Text>
              </View>
            );
          }
          // rowData.push(
          //   <>
          //     {renderCustomRow ? (
          //       <>
          //         {renderCustomRow(data[i], isSelected, () =>
          //           handleRowSelection(data[i].id)
          //         )}
          //       </>
          //     ) : (

          //     )}
          //   </>
          // );
        }
      });

      tableRows.push(
        <View
          key={`row-${data[i].id}`}
          style={[
            styles.row,
            {
              backgroundColor: colors.white,
              borderLeftColor: colors.tableHead,
              borderRightColor: colors.tableHead,
              borderBottomColor: colors.tableHead,
            },
          ]}
        >
          {rowData}
        </View>
      );
    }
    return tableRows;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowSelection = (rowId: number) => {
    const updatedSelectedRows = [...selectedRows];

    if (updatedSelectedRows.includes(rowId)) {
      const index = updatedSelectedRows.indexOf(rowId);
      updatedSelectedRows.splice(index, 1);
    } else {
      updatedSelectedRows.push(rowId);
    }

    setSelectedRows(updatedSelectedRows);
  };

  return (
    <View style={[styles.container]}>
      {renderTableHeader()}

      <>
        <View style={styles.table}>{renderTable()}</View>
        {withPagination && (
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={handlePrevPage}
              style={[styles.paginationButton, backgrounds.tableHead]}
            >
              <Text style={[fonts.size_10, fonts[400], fonts.typography]}>
                Previous
              </Text>
            </TouchableOpacity>
            {renderPaginationButtons()}
            <TouchableOpacity
              onPress={handleNextPage}
              style={[styles.paginationButton, backgrounds.tableHead]}
            >
              <Text style={[fonts.size_10, fonts[400], fonts.typography]}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: calculateWidth(739),
    alignSelf: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: calculateWidth(17),
  },
  headerCell: {
    flex: 1,
    paddingVertical: calculateHeight(8),
    justifyContent: "center",
  },
  table: {
    height: calculateHeight(290),
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    gap: calculateWidth(17),
  },
  selectBox: {
    width: calculateWidth(20),
    height: calculateWidth(20),
    borderRadius: calculateHeight(4),
    borderWidth: 2,
  },
  box: {
    width: calculateWidth(48),
    height: calculateHeight(40),
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    flex: 1,

    paddingVertical: calculateHeight(8),
    justifyContent: "center",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    gap: calculateWidth(4),
  },
  paginationButton: {
    paddingHorizontal: calculateWidth(10),
    paddingVertical: calculateHeight(4),

    borderRadius: calculateWidth(6),
  },
});

export default TableWithPagination;
