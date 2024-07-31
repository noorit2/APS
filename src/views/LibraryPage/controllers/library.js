import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { get_active_completed_modules } from '../modules/library';
import { get_progs } from "../modules/library";
import { get_Subjects } from "../modules/library";

const fetchLibraryData = async (Department_id, profile) => {
  let Lprograms = await get_progs(Department_id);
  let progType = Lprograms.filter(p => profile.program == p.id).length > 0 ? Lprograms.filter(p => profile.program == p.id)[0].type : "";
  const [modules, subjects] = await Promise.all([
    get_active_completed_modules(Department_id, progType, profile.level),
    get_Subjects(Department_id)
  ]);

  let books = [];
  modules.forEach(mod => {
    if (mod.books) {
      mod.books.forEach(b => {
        if (b.url && b.url.length > 0) {
          books.push({ ...b, module: mod.module });
        }
      });
    }
  });

  return { modules, subjects, books };
};

export const useLibraryData = () => {
  const profile = useSelector(state => state.profile.profile);
  const Department_id = profile.Department_id;

  return useQuery(['libraryData', Department_id, profile], () => fetchLibraryData(Department_id, profile), {
    enabled: !!Department_id && !!profile
  });
};
