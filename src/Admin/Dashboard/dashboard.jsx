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
import Grid from "@material-ui/core/Grid";

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
    backgroundColor: "#e6f0ff",
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
      name: "Sameer Kavthekar",
      address: "Sylvan Heights, Aundh, Pune",
      product: [
        { name: "Tomatoes", quantity: "2", cost: "8" },
        { name: "Shorts for Men", quantity: "1", cost: "20" },
      ],
    },
    {
      id: "panel2",
      name: "Shreya Vaidya",
      address: "Mont Vert Dieu, Pashan, Pune",
      product: [{ name: "Notebooks (Pack of 6)", quantity: "2", cost: "40" }],
    },
    {
      id: "panel3",
      name: "Shubham Mujumdar",
      address: "C-3, Pink City, Wakad, Pune",
      product: [
        { name: "Potatoes", quantity: "3", cost: "15" },
        { name: "Ramen", quantity: "5", cost: "10" },
      ],
    },
  ];

  return (
    <div className={classes.root}>
      {data.map((accordion) => {
        const { id, name, address, product } = accordion;

        return (
          <Grid container justify="center">
            <Grid item xs={8}>
              <Accordion
                expanded={expanded === id}
                key={id}
                onChange={handleChange(id)}
                style={{ margin: "0.5rem" }}
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
                    <Grid container justify="center">
                      <Grid item>
                        <TableContainer
                          component={Paper}
                          style={{ marginLeft: "13rem" }}
                        >
                          <Table>
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
                      </Grid>
                    </Grid>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
