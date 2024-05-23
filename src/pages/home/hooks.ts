import axios from "@/axios";
import { AuthContext, useSnackBar } from "@/contexts";
import { News, UserRoles } from "@/models";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHomePage = () => {
    const [news, setNews] = useState<News[]>([]);
    const { showSnackBar } = useSnackBar();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { currentUser } = useContext(AuthContext);
    const userIsAdmin = currentUser?.role === UserRoles.Admin;
    const navigate = useNavigate();

    useEffect(() => {
        getClass();
    }, []);

    const getClass = useCallback(async () => {
        setIsLoading(true);
        await axios
            .get("news")
            .then((res: AxiosResponse) => {
                const responseArray: any[] = res.data;

                const newsArray: News[] = responseArray.map((n: any) => {
                    return {
                        id: n.id,
                        title: n.title,
                        content: n.content,
                        createdAt: new Date(n.createdAt),
                        modifiedAt: new Date(n.modifiedAt),
                    } satisfies News;
                });

                setNews(
                    newsArray.sort(
                        (a: News, b: News) =>
                            b.createdAt.getTime() - a.createdAt.getTime()
                    )
                );
            })
            .catch((error: AxiosError) => {
                showSnackBar("Error fetching data.", "error");
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [showSnackBar]);

    return {
        isLoading,
        news,
        userIsAdmin,
        navigate,
    };
};
