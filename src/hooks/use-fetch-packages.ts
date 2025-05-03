import {useQuery} from "@tanstack/react-query";
import {apiGetPackages} from "@/api/packages.api.ts";
import {PackageModel, PackageUIConstants} from "@/lib/types";
import {entitlementsUIBuilder} from "@/constants/shared.constants.ts";

type Returnable = {
    isFetchingPackages: boolean,
    packages: undefined| (PackageModel & PackageUIConstants )[]
}

function useFetchPackages(group: "entitlement" | "properties_promotion" | "advertisement"){

    const { isPending, data: pkgs } = useQuery<PackageModel[]>({
        queryKey: ["fetchPackages"],
        queryFn: () => apiGetPackages(group),
    });

    let pkgsMergedWithUiConstants: undefined | (PackageModel & PackageUIConstants)[]  = undefined
    if(pkgs) {
        pkgsMergedWithUiConstants = pkgs.map((pkg) => {
            const uiB = entitlementsUIBuilder.find(e => e.slug === pkg.slug)
            const combined: PackageModel & PackageUIConstants = {
                ...pkg,
                ...(uiB || {})
            };

            return combined
        })
    }

    const returnable: Returnable =  {
        isFetchingPackages: isPending,
        packages: pkgsMergedWithUiConstants,
    }
    return returnable;

}

export default useFetchPackages;