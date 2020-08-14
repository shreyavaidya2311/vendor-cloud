import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  table: {
    width: `calc(100%)`,
  },
  headertable: {
    backgroundColor: "lightgrey",
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const data = [
    {
      id: "panel1",
      name: "Shubham",
      address: "C-3, Pink City, Wakad, Pune",
      product: [
        { name: "apple", quantity: "2", cost: "30" },
        { name: "banana", quantity: "1", cost: "200" },
      ],
    },
    {
      id: "panel2",
      name: "Sameer",
      address: "Somewhere in Aundh",
      product: [{ name: "girls", quantity: "2", cost: "20" }],
    },
    {
      id: "panel3",
      name: "Shreya",
      address: "Somewhere in Baner",
      product: [{ name: "child slaves", quantity: "3", cost: "free" }],
    },
  ];

  return (
    <div className={classes.root}>
      {data.map((accordion) => {
        const { id, name, address, product } = accordion;

        return (
          <Accordion
            expanded={expanded === id}
            key={id}
            onChange={handleChange(id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{name}</Typography>
              <Typography className={classes.secondaryHeading}>
                {address}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow className={classes.headertable}>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Cost</TableCell>
                      </TableRow>
                    </TableHead>
                    {product.map((product) => (
                      <TableBody>
                        <TableRow>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.cost}</TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </Table>
                </TableContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
