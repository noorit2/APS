import { Article as ArticleIcon } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, List, ListItem, Link } from "@mui/material";
import styled from "styled-components";
import Loader from "../UI/Loader/Loader";
import { useLibraryData } from './useLibraryData';

const Library = () => {
  const { data, isLoading, error } = useLibraryData();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Typography variant="h6" sx={{ textAlign: "center", color: "red" }}>Error fetching data!</Typography>;
  }

  const { modules, books } = data;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", margin: "0.6rem 0.6rem 0rem 0.6rem", padding: "0 0.8rem" }}>
      <AppBar position="static" sx={{ width: "100%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", bgcolor: "transparent", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", flexWrap: "wrap", paddingLeft: "0!important" }}>
          <Typography variant="h5" component="div" sx={{ fontFamily: "Graphik", width: "100%", color: "var(--styling1)", display: "inline", marginRight: "0.8rem" }}>
            Library
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%", border: "none", borderTop: "none", flexGrow: "1", marginBottom: "0.4rem" }}>
        <List sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "0rem", gap: "0.5rem", padding: "1rem 0" }}>
          {books.length < 1 ? (
            <Typography variant="h6" sx={{ fontFamily: "Graphik", color: "var(--styling1)", width: "100%", textAlign: "center" }}>
              No Books were Found!
            </Typography>
          ) : (
            books.map((book) => (
              <ListItem key={book.name + book.module} sx={{ fontFamily: "GraphikLight", width: '19%', minWidth: "300px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", display: "flex", flexDirection: "column", gap: "0.3rem", bgcolor: "#fff", padding: "1rem" }}>
                <ArticleIcon sx={{ width: "3rem", height: "3rem", color: "var(--styling1)", background: "var(--backGround)", borderRadius: "50%", padding: "0.5rem" }} />
                <Typography sx={{ textAlign: "center" }}>{book.name}</Typography>
                <List sx={{ fontFamily: "GraphikLight", display: "flex", flexWrap: "wrap" }}>
                  <ListItem sx={{ padding: "0" }}>
                    <StyledListItemText primary="Module" secondary={modules.find(modu => modu.id === book.module)?.name || "Module not found"} />
                  </ListItem>
                  <ListItem sx={{ padding: "0" }}>
                    <StyledListItemText primary="Available in library" secondary={book.available ? "Available" : "Not Available"} />
                  </ListItem>
                  <ListItem sx={{ padding: "0" }}>
                    <StyledListItemText primary="File" secondary={<Link href={book.url}>View Book</Link>} />
                  </ListItem>
                </List>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

//*************************************************end of main component********************************************

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontFamily: "GraphikLight",
    fontSize: "0.8rem !important",
    color: "#595d61"
  },
  '& .MuiListItemText-secondary': {
    color: "var(--mainText)"
  }
}));

export default Library;
